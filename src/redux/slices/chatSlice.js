import { createSlice } from "@reduxjs/toolkit";
import { generateResponse } from "../thunks/generateResponse";

const initialState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { chatMessage } = action.payload;
      state.messages.push(chatMessage);
    });
  },
});

export const { addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
