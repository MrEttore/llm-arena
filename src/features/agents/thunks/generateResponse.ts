import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import { getActiveAgentPair } from "@/features/agents/slice";
import {
  addChatMessage,
  appendMessageChunk,
  failMessageStream,
  finalizeMessageStream,
  setMessageStatus,
  startMessageStream,
} from "@/features/chat/slice";
import type { ChatMessage } from "@/features/chat/types";
import { streamChatCompletion } from "@/services/llmManager";
import type { ApiMessage } from "@/types/domain";
import { buildAssistantMessage, buildChatMessage, buildUserMessage } from "@/utils/messageBuilders";

let inFlight: { controller: AbortController; messageId: string } | null = null;

type FulfilledPayload = {
  assistantMessage: ApiMessage;
  userMessage: ApiMessage;
  chatMessage: ChatMessage;
};

export type RejectedPayload = { message: string; chatMessageId?: string; canceled?: boolean };

export const generateResponse = createAsyncThunk<
  FulfilledPayload,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectedPayload;
  }
>("session/generateResponse", async (_, { getState, dispatch, rejectWithValue }) => {
  let currentMessageId: string | undefined;
  let finalResponse = "";
  const controller = new AbortController();

  try {
    const { activeAgent, nonActiveAgent } = getActiveAgentPair(getState());
    if (!activeAgent || !nonActiveAgent) throw new Error("Agent lookup failed");

    const pendingChatMessage = buildChatMessage(nonActiveAgent.id, "pending");
    currentMessageId = pendingChatMessage.id;

    dispatch(addChatMessage(pendingChatMessage));
    dispatch(startMessageStream({ messageId: pendingChatMessage.id }));

    inFlight = { controller, messageId: pendingChatMessage.id };

    await streamChatCompletion({
      model: activeAgent.model,
      messages: activeAgent.conversationMemory,
      signal: controller.signal,
      onChunk: (chunk) => {
        finalResponse += chunk;

        // TODO: Is it efficient to dispatch for every chunk?
        dispatch(appendMessageChunk({ messageId: pendingChatMessage.id, chunk }));
      },
    });

    const assistantMessage = buildAssistantMessage(finalResponse);
    const userMessage = buildUserMessage(finalResponse);
    const chatMessage: ChatMessage = {
      ...pendingChatMessage,
      content: finalResponse,
      status: "sent",
    };

    dispatch(finalizeMessageStream({ messageId: chatMessage.id }));

    return { assistantMessage, userMessage, chatMessage };
  } catch (error) {
    console.error("generateResponse failed:", error);

    const name = error instanceof Error ? error.name : error;
    const errorText = String(error ?? "");
    const isCanceled = name === "AbortError" || String(error).toLowerCase().includes("abort");

    if (currentMessageId)
      dispatch(
        failMessageStream({
          messageId: currentMessageId,
          status: isCanceled ? "canceled" : "error",
          reason: errorText,
        }),
      );

    return rejectWithValue({
      message: isCanceled ? "canceled" : errorText,
      chatMessageId: currentMessageId,
      canceled: isCanceled,
    });
  } finally {
    inFlight = null;
  }
});

export const cancelGenerateResponse = () => (dispatch: AppDispatch) => {
  if (inFlight) {
    inFlight.controller.abort();
    dispatch(setMessageStatus({ messageId: inFlight.messageId, status: "canceled" }));
  }
};
