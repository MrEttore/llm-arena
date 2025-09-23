import { createApiMessage, createChatMessage } from "./models";

export function buildSystemMessage(contestant, contestants) {
  const otherContestant = contestants.find((c) => c.id !== contestant.id);

  let content = `You are ${otherContestant.name} and your personality is as follows: "${otherContestant.systemPrompt}".\n\nYou're in a conversation with ${contestant.name}, whose personality is: "${contestant.systemPrompt}".\n\nResponde by following your personality and never break character.`;

  return createApiMessage("system", content);
}

export function buildAssistantMessage(content) {
  return createApiMessage("assistant", content);
}

export function buildUserMessage(content) {
  return createApiMessage("user", content);
}

export function buildChatMessage(authorId, content) {
  return createChatMessage(authorId, content);
}
