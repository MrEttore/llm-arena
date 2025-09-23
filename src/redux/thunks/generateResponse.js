import { createAsyncThunk } from "@reduxjs/toolkit";
import { getChatCompletion } from "../../services/openAI";
import {
  buildAssistantMessage,
  buildChatMessage,
  buildUserMessage,
} from "../../domain/promptBuilder";

export const generateResponse = createAsyncThunk(
  "match/generateResponse",
  async (_, { getState, signal, rejectWithValue }) => {
    try {
      const { activeContestant } = getState().match;
      const contestant = getState().match.contestants.find(
        (c) => c.id === activeContestant,
      );

      const otherContestant = getState().match.contestants.find(
        (c) => c.id !== activeContestant,
      );

      const completion = await getChatCompletion({
        model: contestant.model,
        messages: contestant.messages,
        signal,
      });

      console.log(`${otherContestant.name}'s response:`, completion);

      const assistantMessage = buildAssistantMessage(completion);
      const userMessage = buildUserMessage(completion);
      const chatMessage = buildChatMessage(otherContestant.id, completion);

      return { assistantMessage, userMessage, chatMessage };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
