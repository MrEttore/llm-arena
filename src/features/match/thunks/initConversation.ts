import type { AppDispatch } from "@/app/store";
import { initChat } from "@/features/chat/thunks";
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
      await dispatch(initChat(conversationStarter));
      return true;
    } catch {
      return false;
    }
  };
}
