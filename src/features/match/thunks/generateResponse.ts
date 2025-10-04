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
    const { activeContestant, contestants } = getState().match;
    if (!activeContestant) throw new Error("No active contestant set");
    const contestant = contestants.find((c) => c.id === activeContestant);
    const otherContestant = contestants.find((c) => c.id !== activeContestant);
    if (!contestant || !otherContestant) throw new Error("Contestants not properly initialized");

    const completion = await getChatCompletion({
      model: contestant.model,
      messages: contestant.messages,
    });

    if (!completion) throw new Error("No completion received");

    const assistantMessage = buildAssistantMessage(completion);
    const userMessage = buildUserMessage(completion);
    const chatMessage = buildChatMessage(otherContestant.id, completion);

    return { assistantMessage, userMessage, chatMessage };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return rejectWithValue(message);
  }
});
