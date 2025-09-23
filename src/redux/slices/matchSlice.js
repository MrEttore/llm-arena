import { createSlice } from "@reduxjs/toolkit";
import { generateResponse } from "../thunks/generateResponse";

const initialState = {
  status: "idle",
  fetchingResponse: false,
  contestants: [],
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setNumberOfExchanges: (state, action) => {
      state.numberOfExchanges = action.payload;
    },
    setActiveContestant: (state, action) => {
      if (!state.activeContestant) {
        state.activeContestant = action.payload;
        return;
      }
      const otherContestant = state.contestants.find(
        (c) => c.id !== state.activeContestant,
      );
      state.activeContestant = otherContestant.id;
    },
    setTurns: (state, action) => {
      state.turns = action.payload;
    },
    addContestant: (state, action) => {
      state.contestants.push(action.payload);
    },
    updateContestant: (state, action) => {
      const index = state.contestants.findIndex(
        (c) => c.id === action.payload.id,
      );
      if (index !== -1)
        state.contestants[index] = {
          ...state.contestants[index],
          ...action.payload,
        };
    },
    clearContestant: (state, action) => {
      state.contestants = state.contestants.filter(
        (c) => c.id !== action.payload,
      );
    },
    updateContestantMessages: (state, action) => {
      const { contestantId, message } = action.payload;
      const contestant = state.contestants.find((c) => c.id === contestantId);
      if (contestant) contestant.messages.push(message);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state, action) => {
      state.fetchingResponse = true;
    });
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      state.fetchingResponse = false;
      const { assistantMessage, userMessage } = action.payload;
      const activeContestant = state.activeContestant;
      const nonActiveContestant = state.contestants.find(
        (c) => c.id !== activeContestant,
      );
      matchSlice.caseReducers.updateContestantMessages(state, {
        payload: {
          contestantId: activeContestant,
          message: assistantMessage,
        },
      });
      matchSlice.caseReducers.updateContestantMessages(state, {
        payload: {
          contestantId: nonActiveContestant.id,
          message: userMessage,
        },
      });
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      state.fetchingResponse = false;
      state.error = action.payload;
    });
  },
});

export const getContestants = (state) => state.match.contestants;

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
