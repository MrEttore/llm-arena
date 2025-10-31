import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { generateResponse } from "@/features/match/thunks/generateResponse";
import type { MatchState } from "@/types";

const initialState: MatchState = {
  status: "idle",
  fetchingResponse: false,
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
    setTurns: (state, action: PayloadAction<number>) => {
      state.numberOfExchanges = action.payload;
    },
    resetMatch: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      state.fetchingResponse = true;
    });
    builder.addCase(generateResponse.fulfilled, (state) => {
      state.fetchingResponse = false;
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      const isCanceled = action.payload?.canceled;

      state.fetchingResponse = false;
      state.error = action.payload?.message;

      matchSlice.caseReducers.setStatus(state, setStatus(isCanceled ? "canceled" : "error"));
    });
  },
});

export const getIsTyping = (state: RootState) => state.match.fetchingResponse;
export const getMatchStatus = (state: RootState) => state.match.status;

export const { setStatus, setNumberOfExchanges, setTurns, resetMatch } = matchSlice.actions;
export default matchSlice.reducer;
