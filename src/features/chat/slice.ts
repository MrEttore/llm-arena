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
    setMessageStatus: (
      state,
      action: PayloadAction<{
        messageId: string;
        status: "sent" | "pending" | "error" | "canceled";
      }>,
    ) => {
      const { messageId, status } = action.payload;
      const message = state.messagesById[messageId];
      if (message) message.status = status;
    },
    updateMessageContent: (
      state,
      action: PayloadAction<{ messageId: string; content: string }>,
    ) => {
      const { messageId, content } = action.payload;
      const message = state.messagesById[messageId];
      if (message) message.content = content;
    },
    // upsertMessage: (state, action) => {},
    // addManyMessages: (state, action) => {},
    resetChat: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(generateResponse.fulfilled, (state, action) => {
      const { chatMessage } = action.payload;

      chatSlice.caseReducers.updateMessageContent(
        state,
        updateMessageContent({ messageId: chatMessage.id, content: chatMessage.content }),
      );
      chatSlice.caseReducers.setMessageStatus(
        state,
        setMessageStatus({ messageId: chatMessage.id, status: "sent" }),
      );
    });
    builder.addCase(generateResponse.rejected, (state, action) => {
      const chatMessageId = action.payload?.chatMessageId;
      const isCanceled = action.payload?.canceled;

      if (!chatMessageId) return;

      chatSlice.caseReducers.setMessageStatus(
        state,
        setMessageStatus({ messageId: chatMessageId, status: isCanceled ? "canceled" : "error" }),
      );
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

export const { addChatMessage, setMessageStatus, updateMessageContent, resetChat } =
  chatSlice.actions;
export default chatSlice.reducer;
