// Slice state types

export type MatchState = {
  status: "idle" | "running" | "completed" | "error";
  fetchingResponse: boolean;
  contestants: Contestant[];
  activeContestant?: string;
  numberOfExchanges?: number;
  error?: string;
};

export type ChatState = {
  messages: ChatMessage[];
};

// Domain types

export type ApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type ChatMessage = {
  id: string;
  authorId: string;
  content: string;
  timeStamp: number;
};

export type Contestant = {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  messages: ApiMessage[];
};
