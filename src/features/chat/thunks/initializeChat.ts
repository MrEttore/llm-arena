import type { AppDispatch, RootState } from "@/app/store";
import { buildChatMessage } from "@/domain/messageBuilders";

import { addChatMessage } from "../slice";

export const initializeChat = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const activeContestantId = getState().match.activeContestant;
    if (!activeContestantId) return;
    const firstChatMessage = buildChatMessage(activeContestantId, conversationStarter);
    dispatch(addChatMessage(firstChatMessage));
  };
};
