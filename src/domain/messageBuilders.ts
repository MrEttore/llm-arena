import type { ApiMessage, ChatMessage, Contestant } from "./types";

export function buildSystemMessage(contestant: Contestant, contestants: Contestant[]): ApiMessage {
  const otherContestant = contestants.find((c) => c.id !== contestant.id);
  if (!otherContestant) {
    throw new Error("Other contestant not found");
  }

  // TODO: Add function to build more complex system prompts

  const content = `You are ${otherContestant.name} and your personality is as follows: "${otherContestant.systemPrompt}".\n\nYou're in a conversation with ${contestant.name}, whose personality is: "${contestant.systemPrompt}".\n\nResponde by following your personality and never break character.`;
  return { role: "system", content };
}

export function buildAssistantMessage(content: string): ApiMessage {
  return { role: "assistant", content };
}

export function buildUserMessage(content: string): ApiMessage {
  return { role: "user", content };
}

export function buildChatMessage(
  authorId: string,
  content: string,
  status?: "sent" | "pending" | "error",
): ChatMessage {
  return {
    id: crypto.randomUUID(),
    authorId,
    content,
    timestamp: Date.now(),
    status: status ?? "sent",
  };
}
