// Slice state types

export type MatchState = {
  status: "idle" | "running" | "completed" | "error" | "canceled";
  fetchingResponse: boolean;
  numberOfExchanges?: number;
  error?: string;
};

export type ChatState = {
  messageIds: string[];
  messagesById: { [id: string]: ChatMessage };
};

export type ContestantsState = {
  contestants: Contestant[];
  activeContestantId?: string;
};

// Domain types

export type ApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
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

export type Contestant = {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  messages: ApiMessage[]; // rename to "messageHistory" or "promptHistory" or (better) ConversationBufferMemory?
  isThinking?: boolean;
  avatarUrl?: string;
};
