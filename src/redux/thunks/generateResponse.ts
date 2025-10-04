import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  buildAssistantMessage,
  buildChatMessage,
  buildUserMessage,
} from "../../domain/promptBuilder";
import { getChatCompletion } from "../../services/openAI";
import type { GenerateResponseReturn } from "../../types/domain";
import type { RootState } from "../store";

export const generateResponse = createAsyncThunk<
  GenerateResponseReturn,
  void,
  { state: RootState }
>("match/generateResponse", async (_, { getState, signal, rejectWithValue }) => {
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
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
