import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import { generateResponse } from "@/features/session/thunks";
import type { SessionState } from "@/features/session/types";

const initialState: SessionState = {
  status: "idle",
  fetchingResponse: false,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<SessionState["status"]>) => {
      state.status = action.payload;
    },
    setNumberOfExchanges: (state, action: PayloadAction<number>) => {
      state.numberOfExchanges = action.payload;
    },

    resetSession: () => initialState,
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

      sessionSlice.caseReducers.setStatus(state, setStatus(isCanceled ? "canceled" : "error"));
    });
  },
});

export const getSessionStatus = (state: RootState) => state.session.status;

export const { setStatus, setNumberOfExchanges, resetSession } = sessionSlice.actions;
export default sessionSlice.reducer;
