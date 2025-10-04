export interface ApiMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatMessage {
  id: string;
  authorId: string;
  content: string;
  timeStamp: number;
}

export interface Contestant {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  messages: ApiMessage[];
}

export interface GenerateResponseReturn {
  assistantMessage: ApiMessage;
  userMessage: ApiMessage;
  chatMessage: ChatMessage;
}
