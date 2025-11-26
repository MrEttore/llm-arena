import type { AppDispatch } from "@/app/store";
import { setActiveAgentId } from "@/features/agents/slice";
import { initAgentConversationMemory } from "@/features/agents/thunks";
import { initChat } from "@/features/chat/thunks";
import { setNumberOfExchanges } from "@/features/match/slice";

export function initConversation(
  startingAgent: string,
  numberOfExchanges: number,
  conversationStarter: string,
) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setActiveAgentId(startingAgent));
      dispatch(setNumberOfExchanges(numberOfExchanges));
      await dispatch(initAgentConversationMemory(conversationStarter));
      await dispatch(initChat(conversationStarter));
      return true;
    } catch {
      return false;
    }
  };
}
