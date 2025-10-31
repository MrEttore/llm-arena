import type { AppDispatch, RootState } from "@/app/store";
import {
  buildAssistantMessage,
  buildSystemMessage,
  buildUserMessage,
} from "@/utils/messageBuilders";

import { updateContestantMessages } from "../slice";

export const initializeContestantMessages = (conversationStarter: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { contestants, activeContestantId } = getState().contestants;
    if (!activeContestantId) return;

    for (const contestant of contestants) {
      const systemMessage = buildSystemMessage(contestant, contestants);
      dispatch(
        updateContestantMessages({
          contestantId: contestant.id,
          message: systemMessage,
        }),
      );

      if (contestant.id === activeContestantId) {
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
