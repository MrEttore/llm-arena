// Slice state types

export type MatchState = {
  status: "idle" | "running" | "completed" | "error";
  fetchingResponse: boolean;
  numberOfExchanges?: number;
  error?: string;
};

export type ChatState = {
  messages: ChatMessage[];
};

export type ContestantsState = {
  contestants: Contestant[];
  activeContestant?: string;
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
