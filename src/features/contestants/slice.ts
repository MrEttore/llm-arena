import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { generateResponse } from "@/features/match/thunks/generateResponse";
import type { ApiMessage, Contestant, ContestantsState } from "@/types";

const initialState: ContestantsState = {
  contestants: [],
};

const contestantsSlice = createSlice({
  name: "contestants",
  initialState,
  reducers: {
    setActiveContestantId: (state, action: PayloadAction<string>) => {
      state.activeContestantId = action.payload;
    },
    switchActiveContestant: (state) => {
      const nonActiveContestant = state.contestants.find((c) => c.id !== state.activeContestantId);
      if (!nonActiveContestant) return;

      state.activeContestantId = nonActiveContestant.id;
    },
    addContestant: (state, action: PayloadAction<Contestant>) => {
      state.contestants.push(action.payload);
    },
    updateContestant: (state, action: PayloadAction<Contestant>) => {
      const index = state.contestants.findIndex((c: Contestant) => c.id === action.payload.id);
      if (index !== -1) {
        state.contestants[index] = {
          ...state.contestants[index],
          ...action.payload,
        } as Contestant;
      }
    },
    clearContestant: (state, action: PayloadAction<string>) => {
      state.contestants = state.contestants.filter((c: Contestant) => c.id !== action.payload);
    },
    updateContestantMessages: (
      state,
      action: PayloadAction<{ contestantId: string; message: ApiMessage }>,
    ) => {
      const { contestantId, message } = action.payload;
      const contestant = state.contestants.find((c: Contestant) => c.id === contestantId);
      if (contestant) contestant.messages.push(message);
    },
    resetContestants: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      const activeContestantId = state.activeContestantId;
      const activeContestantIndex = state.contestants.findIndex((c) => c.id === activeContestantId);
      if (activeContestantIndex !== -1) state.contestants[activeContestantIndex].isThinking = true;
    });
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { assistantMessage, userMessage } = action.payload;

      const activeContestantId = state.activeContestantId;
      const activeContestantIndex = state.contestants.findIndex((c) => c.id === activeContestantId);
      if (!activeContestantId) return;

      const nonActiveContestant = state.contestants.find(
        (c: Contestant) => c.id !== activeContestantId,
      );
      if (!nonActiveContestant) return;

      contestantsSlice.caseReducers.updateContestantMessages(state, {
        type: "match/updateContestantMessages",
        payload: { contestantId: activeContestantId, message: assistantMessage },
      });

      contestantsSlice.caseReducers.updateContestantMessages(state, {
        type: "match/updateContestantMessages",
        payload: {
          contestantId: nonActiveContestant.id,
          message: userMessage,
        },
      });

      if (activeContestantIndex !== -1) state.contestants[activeContestantIndex].isThinking = false;
    });
  },
});

export const getContestants = (state: RootState) => state.contestants.contestants;
export const getContestantById = (state: RootState, id: string) => {
  const contestant = state.contestants.contestants.find((c) => c.id === id);
  const index = state.contestants.contestants.findIndex((c) => c.id === id);
  return { contestant, index };
};

export const {
  setActiveContestantId,
  switchActiveContestant,
  addContestant,
  updateContestant,
  clearContestant,
  updateContestantMessages,
  resetContestants,
} = contestantsSlice.actions;
export default contestantsSlice.reducer;
