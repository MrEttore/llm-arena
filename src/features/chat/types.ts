export type ChatState = {
  messageIds: string[];
  messagesById: { [id: string]: ChatMessage };
};

export type ChatMessageStatus = "pending" | "streaming" | "sent" | "error" | "canceled";

export type ChatMessageStream = {
  chunks: string[];
  startedAt: number;
  finishedAt?: number;
};

export type ChatMessage = {
  id: string;
  authorId: string;
  content: string;
  timestamp: number;
  status?: ChatMessageStatus;
  stream?: ChatMessageStream;
};
