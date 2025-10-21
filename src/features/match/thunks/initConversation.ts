import type { AppDispatch } from "@/app/store";
import { initializeChat } from "@/features/chat/thunks/initializeChat";
import { setActiveContestantId } from "@/features/contestants/slice";
import { initializeContestantMessages } from "@/features/contestants/thunks/initializeContestantMessages";

import { setNumberOfExchanges } from "../slice";

export function initConversation(
  startingContestant: string,
  numberOfExchanges: number,
  conversationStarter: string,
) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setActiveContestantId(startingContestant));
      dispatch(setNumberOfExchanges(numberOfExchanges));
      await dispatch(initializeContestantMessages(conversationStarter));
      await dispatch(initializeChat(conversationStarter));
      return true;
    } catch {
      return false;
    }
  };
}
