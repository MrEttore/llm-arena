import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

const matchSlice = createSlice({
  name: "match",
  initialState,
  reducers: {
    setTurns: (state, action) => {
      state.turns = action.payload;
    },
    setContestant: (state, action) => {
      const contestant = "contestant" + action.payload.id;
      state[contestant] = action.payload;
    },
    clearContestant: (state, action) => {
      const contestant = "contestant" + action.payload;
      state[contestant] = undefined;
    },
  },
});

export const getContestant1 = (state) => state.match.contestant1;
export const getContestant2 = (state) => state.match.contestant2;

export const { setTurns, setContestant, clearContestant } = matchSlice.actions;
export default matchSlice.reducer;
