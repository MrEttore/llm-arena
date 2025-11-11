import type { PayloadAction } from "@reduxjs/toolkit";
import { createSelector, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@/app/store";
import type { ChatMessage, ChatMessageStatus, ChatState } from "@/types/domain";

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
        status: ChatMessageStatus;
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
    startMessageStream: (state, action: PayloadAction<{ messageId: string }>) => {
      const message = state.messagesById[action.payload.messageId];
      if (!message) return;
      message.status = "streaming";
      message.stream = { chunks: [], startedAt: Date.now() };
    },
    appendMessageChunk: (state, action: PayloadAction<{ messageId: string; chunk: string }>) => {
      const message = state.messagesById[action.payload.messageId];
      if (!message || message.status !== "streaming") return;
      message.stream?.chunks.push(action.payload.chunk);
    },
    finalizeMessageStream: (state, action: PayloadAction<{ messageId: string }>) => {
      const message = state.messagesById[action.payload.messageId];
      if (!message || message.status !== "streaming") return;
      const finalContent = message.stream?.chunks.join("") ?? "";
      message.content = finalContent;
      message.status = "sent";
      if (message.stream) message.stream.finishedAt = Date.now();
    },
    failMessageStream: (
      state,
      action: PayloadAction<{ messageId: string; status: "error" | "canceled"; reason?: string }>,
    ) => {
      const { messageId, status, reason } = action.payload;
      const message = state.messagesById[messageId];
      if (!message) return;
      message.status = status;
      if (message.stream) message.stream.finishedAt = Date.now();
      if (reason)
        message.stream = {
          ...(message.stream ?? { chunks: [], startedAt: Date.now() }),
          error: reason,
        } as typeof message.stream;
    },
    resetChat: () => initialState,
  },
});

export const getMessages = createSelector(
  (state: RootState) => state.chat.messageIds,
  (state: RootState) => state.chat.messagesById,
  (ids, byId) => ids.map((id) => byId[id]),
);
export const getMessageById = (state: RootState, id: string) => state.chat.messagesById[id];
export const getMessagesCount = (state: RootState) => state.chat.messageIds.length;

export const {
  addChatMessage,
  setMessageStatus,
  updateMessageContent,
  startMessageStream,
  finalizeMessageStream,
  failMessageStream,
  appendMessageChunk,
  resetChat,
} = chatSlice.actions;
export default chatSlice.reducer;
