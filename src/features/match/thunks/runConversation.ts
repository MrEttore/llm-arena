import type { AppDispatch } from "@/app/store";
import { initializeChat } from "@/features/chat/thunks/initializeChat";

import { setActiveContestant, setStatus } from "../slice";
import { generateResponse } from "./generateResponse";
import { initializeMessagesArrays } from "./initializeMessagesArrays";

export function runConversation(
  startingContestant: string,
  conversationStarter: string,
  numberOfExchanges: number,
) {
  return async function (dispatch: AppDispatch) {
    try {
      dispatch(setStatus("running"));
      dispatch(setActiveContestant(startingContestant));
      dispatch(initializeMessagesArrays(conversationStarter));
      dispatch(initializeChat(conversationStarter));

      for (let i = 0; i < numberOfExchanges; i++) {
        await dispatch(generateResponse()).unwrap();
        dispatch(setActiveContestant(undefined));
      }
    } catch (error) {
      setStatus("error");
      console.error("runConversation failed:", error);
    } finally {
      dispatch(setStatus("completed"));
    }
  };
}
