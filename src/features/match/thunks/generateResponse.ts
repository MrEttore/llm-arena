import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import {
  buildAssistantMessage,
  buildChatMessage,
  buildUserMessage,
} from "@/domain/messageBuilders";
import { getChatCompletion } from "@/services/openAI/client";

type generateResponsePayload = {
  assistantMessage: ReturnType<typeof buildAssistantMessage>;
  userMessage: ReturnType<typeof buildUserMessage>;
  chatMessage: ReturnType<typeof buildChatMessage>;
};

export const generateResponse = createAsyncThunk<
  generateResponsePayload,
  void,
  { state: RootState; dispatch: AppDispatch; rejectValue: string }
>("match/generateResponse", async (_, { getState, rejectWithValue }) => {
  try {
    const { activeContestantId, contestants } = getState().contestants;

    const activeContestant = contestants.find((c) => c.id === activeContestantId);
    if (!activeContestant) throw new Error("No active contestant found");

    const nonActiveContestant = contestants.find((c) => c.id !== activeContestantId);
    if (!nonActiveContestant) throw new Error("No non-active contestant found");

    const completion = await getChatCompletion({
      model: activeContestant.model,
      messages: activeContestant.messages,
    });
    if (!completion) throw new Error("No completion received");

    const assistantMessage = buildAssistantMessage(completion);
    const userMessage = buildUserMessage(completion);
    const chatMessage = buildChatMessage(nonActiveContestant.id, completion);

    return { assistantMessage, userMessage, chatMessage };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return rejectWithValue(message);
  }
});
