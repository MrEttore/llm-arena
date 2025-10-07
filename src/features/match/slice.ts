import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { MatchState } from "@/domain/types";
import { generateResponse } from "@/features/match/thunks/generateResponse";

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
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.pending, (state) => {
      state.fetchingResponse = true;
    });
    builder.addCase(generateResponse.fulfilled, (state) => {
      state.fetchingResponse = false;
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      state.fetchingResponse = false;
      state.status = "error";
      state.error = (action.payload as string) ?? "Unknown error";
    });
  },
});

export const { setStatus, setNumberOfExchanges, setTurns } = matchSlice.actions;
export default matchSlice.reducer;
