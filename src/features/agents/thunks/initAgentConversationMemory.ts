import type { AppDispatch, RootState } from "@/app/store";
import {
  getActiveAgentId,
  getAgents,
  updateAgentConversationMemory,
} from "@/features/agents/slice";
import {
  buildAssistantMessage,
  buildSystemMessage,
  buildUserMessage,
} from "@/features/agents/utils";

export const initAgentConversationMemory = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    const activeAgentId = getActiveAgentId(state);
    const agents = getAgents(state);

    if (!activeAgentId) return;

    for (const agent of agents) {
      const systemMessage = buildSystemMessage(agent, agents);
      dispatch(
        updateAgentConversationMemory({
          agentId: agent.id,
          message: systemMessage,
        }),
      );

      if (agent.id === activeAgentId) {
        const userMessage = buildUserMessage(conversationStarter);
        dispatch(
          updateAgentConversationMemory({
            agentId: agent.id,
            message: userMessage,
          }),
        );
      } else {
        const assistantMessage = buildAssistantMessage(conversationStarter);
        dispatch(
          updateAgentConversationMemory({
            agentId: agent.id,
            message: assistantMessage,
          }),
        );
      }
    }
  };
};
