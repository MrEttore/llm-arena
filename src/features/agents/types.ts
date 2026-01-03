import type { ApiMessage } from "@/types/domain";

export type AgentsState = {
  agentsById: { [id: string]: Agent };
  agentIds: string[];
  activeAgentId: string | undefined;
  slotAgentIds: [string | null, string | null];
};

export type Agent = {
  id: string;
  name: string;
  model: string;
  systemPrompt: string;
  avatar?: string;
  conversationMemory: ApiMessage[];
  isGeneratingAvatar?: boolean;
};
