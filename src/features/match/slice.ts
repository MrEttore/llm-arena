import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { ApiMessage, Contestant, MatchState } from "@/domain/types";
import { generateResponse } from "@/features/match/thunks/generateResponse";

const initialState: MatchState = {
  status: "idle",
  fetchingResponse: false,
  contestants: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<MatchState["status"]>) => {
      state.status = action.payload;
    },
    setNumberOfExchanges: (state, action: PayloadAction<number>) => {
      state.numberOfExchanges = action.payload;
    },
    setActiveContestant: (state, action: PayloadAction<string | undefined>) => {
      if (!state.activeContestant && action.payload) {
        state.activeContestant = action.payload;
        return;
      }
      if (state.activeContestant) {
        const otherContestant = state.contestants.find(
          (c: Contestant) => c.id !== state.activeContestant,
        );
        if (otherContestant) state.activeContestant = otherContestant.id;
      } else if (action.payload) {
        state.activeContestant = action.payload;
      }
    },
    setTurns: (state, action: PayloadAction<number>) => {
      state.numberOfExchanges = action.payload;
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
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      state.fetchingResponse = true;
    });
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      state.fetchingResponse = false;
      const { assistantMessage, userMessage } = action.payload;
      const activeContestant = state.activeContestant;
      if (!activeContestant) return;
      const nonActiveContestant = state.contestants.find(
        (c: Contestant) => c.id !== activeContestant,
      );
      matchSlice.caseReducers.updateContestantMessages(state, {
        payload: { contestantId: activeContestant, message: assistantMessage },
        type: "match/updateContestantMessages",
      });
      if (nonActiveContestant) {
        matchSlice.caseReducers.updateContestantMessages(state, {
          payload: {
            contestantId: nonActiveContestant.id,
            message: userMessage,
          },
          type: "match/updateContestantMessages",
        });
      }
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      state.fetchingResponse = false;
      state.error = action.payload as string;
    });
  },
});

export const getContestants = (state: RootState) => state.match.contestants;

export const {
  setStatus,
  setNumberOfExchanges,
  setActiveContestant,
  setTurns,
  addContestant,
  updateContestant,
  clearContestant,
  updateContestantMessages,
} = matchSlice.actions;
export default matchSlice.reducer;
