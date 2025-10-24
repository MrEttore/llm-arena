import type { AppDispatch, RootState } from "@/app/store";
import { switchActiveContestant } from "@/features/contestants/slice";

import { setStatus } from "../slice";
import type { RejectedPayload } from "./generateResponse";
import { generateResponse } from "./generateResponse";

export function runConversation() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(setStatus("running"));
    const numberOfExchanges = getState().match.numberOfExchanges || 0;

    for (let i = 0; i < numberOfExchanges; i++) {
      try {
        await dispatch(generateResponse()).unwrap();
        dispatch(switchActiveContestant());
      } catch (error) {
        const cancelError = error as RejectedPayload;
        if (cancelError?.canceled) {
          console.log("Cancel detected! Breaking loop...");
          dispatch(setStatus("canceled"));
          return;
        }
        console.error("runConversation error:", error);
        dispatch(setStatus("error"));
        return;
      }
    }

    dispatch(setStatus("completed"));
  };
}
