import type { AppDispatch, RootState } from "@/app/store";
import { buildChatMessage } from "@/utils/messageBuilders";

import { addChatMessage } from "../slice";

export const initializeChat = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const activeContestantId = getState().contestants.activeContestantId;
    if (!activeContestantId) return;
    const firstChatMessage = buildChatMessage(activeContestantId, conversationStarter);
    dispatch(addChatMessage(firstChatMessage));
  };
};
