import { addChatMessage } from "../slices/chatSlice";
import {
  setActiveContestant,
  setStatus,
  updateContestantMessages,
} from "../slices/matchSlice";
import { generateResponse } from "./generateResponse";
import { initializeChat } from "./initializeChat";
import { initializeMessagesArrays } from "./initializeMessagesArrays";

// "Plain" thunk.
// Best for orchestration/flows: loops, branches, chaining multiple async steps.
// Lets you compose multiple "createAsyncThunks" (or other plain thunks).

export function runConversation(
  startingContestant,
  conversationStarter,
  numberOfExchanges,
) {
  return async function (dispatch) {
    try {
      dispatch(setStatus("running"));

      // Seed
      dispatch(setActiveContestant(startingContestant));
      dispatch(initializeMessagesArrays(conversationStarter));
      dispatch(initializeChat(conversationStarter));

      console.log("Conversation starter:", conversationStarter);

      // Exchange logic.
      for (let i = 0; i < numberOfExchanges; i++) {
        console.log("Exchange", i + 1);

        await dispatch(generateResponse()).unwrap();

        dispatch(setActiveContestant());
      }
    } catch (error) {
      setStatus("error");
      console.error("runConversation failed:", error);
    } finally {
      dispatch(setStatus("completed"));
    }
  };
}
