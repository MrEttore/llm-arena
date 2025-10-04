import { buildChatMessage } from "../../domain/promptBuilder";
import { addChatMessage } from "../slices/chatSlice";
import type { AppDispatch, RootState } from "../store";

export const initializeChat = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const activeContestantId = getState().match.activeContestant;
    if (!activeContestantId) return;
    const firstChatMessage = buildChatMessage(activeContestantId, conversationStarter);
    dispatch(addChatMessage(firstChatMessage));
  };
};
