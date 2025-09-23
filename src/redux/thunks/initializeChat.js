import { buildChatMessage } from "../../domain/promptBuilder";
import { addChatMessage } from "../slices/chatSlice";

export const initializeChat = (conversationStarter) => {
  return async (dispatch, getState) => {
    const activeContestantId = getState().match.activeContestant;
    const firstChatMessage = buildChatMessage(
      activeContestantId,
      conversationStarter,
    );
    dispatch(addChatMessage(firstChatMessage));
  };
};
