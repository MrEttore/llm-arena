import type { AppDispatch, RootState } from "@/app/store";
import { switchActiveContestant } from "@/features/contestants/slice";

import { setStatus } from "../slice";
import { generateResponse } from "./generateResponse";

export function runConversation() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    try {
      dispatch(setStatus("running"));
      const numberOfExchanges = getState().match.numberOfExchanges || 0;

      for (let i = 0; i < numberOfExchanges; i++) {
        await dispatch(generateResponse()).unwrap();
        dispatch(switchActiveContestant());
      }
    } catch (error) {
      dispatch(setStatus("error"));
      console.error("runConversation failed:", error);
    } finally {
      dispatch(setStatus("completed"));
    }
  };
}
