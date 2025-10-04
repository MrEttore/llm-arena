import type { ApiMessage, ChatMessage, Contestant } from "../types/domain";

export function createContestant(name: string, model: string, systemPrompt: string): Contestant {
  return { id: crypto.randomUUID(), name, model, systemPrompt, messages: [] };
}

export function createApiMessage(role: ApiMessage["role"], content: string): ApiMessage {
  return { role, content };
}

export function createChatMessage(authorId: string, content: string): ChatMessage {
  return { id: crypto.randomUUID(), authorId, content, timeStamp: Date.now() };
}
