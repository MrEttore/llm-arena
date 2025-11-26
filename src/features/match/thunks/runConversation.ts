import type { AppDispatch, RootState } from "@/app/store";
import { switchActiveAgent } from "@/features/agents/slice";
import { setStatus } from "@/features/match/slice";
import type { RejectedPayload } from "@/features/match/thunks";
import { generateResponse } from "@/features/match/thunks";

export function runConversation() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(setStatus("running"));
    const numberOfExchanges = getState().match.numberOfExchanges || 0;

    for (let i = 0; i < numberOfExchanges; i++) {
      try {
        await dispatch(generateResponse()).unwrap();
        dispatch(switchActiveAgent());
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
