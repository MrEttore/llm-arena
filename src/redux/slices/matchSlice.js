import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
};

const matchSlice = createSlice({
  name: 'match',
  initialState,
  reducers: {
    setTurns: (state, action) => {
      state.turns = action.payload;
    },
    setContestantA: (state, action) => {
      state.contestantA = action.payload;
    },
    setContestantB: (state, action) => {
      state.contestantB = action.payload;
    },
  },
});

export const getContestantA = (state) => state.match.contestantA;
export const getContestantB = (state) => state.match.contestantB;

export const { setTurns, setContestantA, setContestantB } = matchSlice.actions;
export default matchSlice.reducer;
