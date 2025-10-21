import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { ChatMessage, ChatState } from "@/domain/types";
import { generateResponse } from "@/features/match/thunks/generateResponse";

const initialState: ChatState = {
  messageIds: [],
  messagesById: {},
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChatMessage: (state, action: PayloadAction<ChatMessage>) => {
      const message = action.payload;
      state.messagesById[message.id] = message;
      if (!state.messageIds.includes(message.id)) state.messageIds.push(message.id);
    },
    // upsertMessage: (state, action) => {},
    // addManyMessages: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { chatMessage } = action.payload;
      state.messagesById[chatMessage.id] = chatMessage;
      if (!state.messageIds.includes(chatMessage.id)) state.messageIds.push(chatMessage.id);
    });
  },
});

export const getMessages = createSelector(
  (state: RootState) => state.chat.messageIds,
  (state: RootState) => state.chat.messagesById,
  (ids, byId) => ids.map((id) => byId[id]),
);
export const getMessageById = (state: RootState, id: string) => state.chat.messagesById[id];
export const getMessagesCount = (state: RootState) => state.chat.messageIds.length;

export const { addChatMessage } = chatSlice.actions;
export default chatSlice.reducer;
