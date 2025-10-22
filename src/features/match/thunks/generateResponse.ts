import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import {
  buildAssistantMessage,
  buildChatMessage,
  buildUserMessage,
} from "@/domain/messageBuilders";
import type { ApiMessage, ChatMessage } from "@/domain/types";
import { addChatMessage } from "@/features/chat/slice";
import { getChatCompletion } from "@/services/openAI/client";

type generateResponsePayload = {
  assistantMessage: ApiMessage;
  userMessage: ApiMessage;
  chatMessage: ChatMessage;
};

export const generateResponse = createAsyncThunk<
  generateResponsePayload,
  void,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: { message: string; chatMessageId?: string };
  }
>("match/generateResponse", async (_, { getState, dispatch, rejectWithValue }) => {
  let chatMessageId: string | undefined;

  try {
    const { activeContestantId, contestants } = getState().contestants;

    const activeContestant = contestants.find((c) => c.id === activeContestantId);
    if (!activeContestant) throw new Error("No active contestant found");

    const nonActiveContestant = contestants.find((c) => c.id !== activeContestantId);
    if (!nonActiveContestant) throw new Error("No non-active contestant found");

    const pendingChatMessage = buildChatMessage(nonActiveContestant.id, "", "pending");
    chatMessageId = pendingChatMessage.id;
    dispatch(addChatMessage(pendingChatMessage));

    const completion = await getChatCompletion({
      model: activeContestant.model,
      messages: activeContestant.messages,
    });
    if (!completion) throw new Error("No completion received");

    const assistantMessage = buildAssistantMessage(completion);
    const userMessage = buildUserMessage(completion);
    const chatMessage: ChatMessage = { ...pendingChatMessage, content: completion, status: "sent" };

    return { assistantMessage, userMessage, chatMessage };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return rejectWithValue({ message, chatMessageId });
  }
});
