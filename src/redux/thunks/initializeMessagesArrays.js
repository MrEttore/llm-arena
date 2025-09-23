import {
  buildAssistantMessage,
  buildSystemMessage,
  buildUserMessage,
} from "../../domain/promptBuilder";
import { updateContestantMessages } from "../slices/matchSlice";

export const initializeMessagesArrays = (conversationStarter) => {
  return async (dispatch, getState) => {
    const contestants = getState().match.contestants;
    const activeContestant = getState().match.activeContestant;

    // initialize system prompts for each contestant.
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
