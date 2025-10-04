import type { PayloadAction} from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import type { ChatMessage } from "../../types/domain";
import { generateResponse } from "../thunks/generateResponse";

export interface ChatState {
  messages: ChatMessage[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
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
