import type { ApiMessage, ChatMessage, Contestant } from "../types/domain";
import { createApiMessage, createChatMessage } from "./models";

export function buildSystemMessage(contestant: Contestant, contestants: Contestant[]): ApiMessage {
  const otherContestant = contestants.find((c) => c.id !== contestant.id);
  if (!otherContestant) {
    return createApiMessage("system", "No opponent available.");
  }
  const content = `You are ${otherContestant.name} and your personality is as follows: "${otherContestant.systemPrompt}".\n\nYou're in a conversation with ${contestant.name}, whose personality is: "${contestant.systemPrompt}".\n\nResponde by following your personality and never break character.`;
  return createApiMessage("system", content);
}

export function buildAssistantMessage(content: string): ApiMessage {
  return createApiMessage("assistant", content);
}

export function buildUserMessage(content: string): ApiMessage {
  return createApiMessage("user", content);
}

export function buildChatMessage(authorId: string, content: string): ChatMessage {
  return createChatMessage(authorId, content);
}
