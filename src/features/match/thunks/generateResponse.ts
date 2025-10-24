import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import {
  buildAssistantMessage,
  buildChatMessage,
  buildUserMessage,
} from "@/domain/messageBuilders";
import type { ApiMessage, ChatMessage } from "@/domain/types";
import { addChatMessage, setMessageStatus } from "@/features/chat/slice";
import { getChatCompletion } from "@/services/openAI/api";

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
>("match/generateResponse", async (_, { getState, dispatch, rejectWithValue }) => {
  let chatMessageId: string | undefined;
  const controller = new AbortController();

  try {
    const { activeContestantId, contestants } = getState().contestants;

    const activeContestant = contestants.find((c) => c.id === activeContestantId);
    if (!activeContestant) throw new Error("No active contestant found");

    const nonActiveContestant = contestants.find((c) => c.id !== activeContestantId);
    if (!nonActiveContestant) throw new Error("No non-active contestant found");

    const pendingChatMessage = buildChatMessage(nonActiveContestant.id, "", "pending");
    chatMessageId = pendingChatMessage.id;
    dispatch(addChatMessage(pendingChatMessage));

    inFlight = { controller, messageId: pendingChatMessage.id };

    const completion = await getChatCompletion({
      model: activeContestant.model,
      messages: activeContestant.messages,
      signal: controller.signal,
    });
    if (!completion) throw new Error("No completion received");

    const assistantMessage = buildAssistantMessage(completion);
    const userMessage = buildUserMessage(completion);
    const chatMessage: ChatMessage = { ...pendingChatMessage, content: completion, status: "sent" };

    return { assistantMessage, userMessage, chatMessage };
  } catch (error) {
    console.error("generateResponse failed:", error);

    const name = error instanceof Error ? error.name : error;
    const errorText = String(error ?? "");
    const isCanceled = name === "AbortError" || String(error).toLowerCase().includes("abort");

    return rejectWithValue({
      message: isCanceled ? "canceled" : errorText,
      chatMessageId,
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
    console.log("Request aborted!");
  }
};
