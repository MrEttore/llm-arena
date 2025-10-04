import { setActiveContestant, setStatus } from "../slices/matchSlice";
import type { AppDispatch } from "../store";
import { generateResponse } from "./generateResponse";
import { initializeChat } from "./initializeChat";
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
