import type { AppDispatch, RootState } from "@/app/store";
import { addChatMessage } from "@/features/chat/slice";
import { buildChatMessage } from "@/utils/messageBuilders";

export const initChat = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const activeAgentId = getState().agents.activeAgentId;
    if (!activeAgentId) return;
    const firstChatMessage = buildChatMessage(activeAgentId, "sent", conversationStarter);
    dispatch(addChatMessage(firstChatMessage));
  };
};
