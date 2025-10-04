import {
  buildAssistantMessage,
  buildSystemMessage,
  buildUserMessage,
} from "../../domain/promptBuilder";
import { updateContestantMessages } from "../slices/matchSlice";
import type { AppDispatch, RootState } from "../store";

export const initializeMessagesArrays = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { contestants, activeContestant } = getState().match;
    if (!activeContestant) return;

    for (const contestant of contestants) {
      const systemMessage = buildSystemMessage(contestant, contestants);
      dispatch(
        updateContestantMessages({
          contestantId: contestant.id,
          message: systemMessage,
        }),
      );

      if (contestant.id === activeContestant) {
        const userMessage = buildUserMessage(conversationStarter);
        dispatch(
          updateContestantMessages({
            contestantId: contestant.id,
            message: userMessage,
          }),
        );
      } else {
        const assistantMessage = buildAssistantMessage(conversationStarter);
        dispatch(
          updateContestantMessages({
            contestantId: contestant.id,
            message: assistantMessage,
          }),
        );
      }
    }
  };
};
