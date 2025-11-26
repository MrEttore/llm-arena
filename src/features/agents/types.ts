import type { ApiMessage } from "@/types/domain";

export type AgentsState = {
  agents: Agent[];
  activeAgentId?: string;
};

export type Agent = {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  conversationMemory: ApiMessage[];
  isThinking?: boolean;
  avatarUrl?: string;
};
