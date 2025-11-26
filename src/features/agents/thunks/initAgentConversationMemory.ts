import type { AppDispatch, RootState } from "@/app/store";
import { updateAgentConversationMemory } from "@/features/agents/slice";
import {
  buildAssistantMessage,
  buildSystemMessage,
  buildUserMessage,
} from "@/utils/messageBuilders";

export const initAgentConversationMemory = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { agents, activeAgentId } = getState().agents;
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
