import type { AppDispatch, RootState } from "@/app/store";
import { switchActiveAgent } from "@/features/agents/slice";
import {
  generateResponse,
  type RejectedPayload as RejectedPayloadGenerateResponse,
} from "@/features/agents/thunks";
import { setStatus } from "@/features/session/slice";

export function runConversation() {
  return async function (dispatch: AppDispatch, getState: () => RootState) {
    dispatch(setStatus("running"));
    const numberOfExchanges = getState().session.numberOfExchanges || 0;

    for (let i = 0; i < numberOfExchanges; i++) {
      try {
        await dispatch(generateResponse()).unwrap();
        dispatch(switchActiveAgent());
      } catch (error) {
        const cancelError = error as RejectedPayloadGenerateResponse;
        if (cancelError?.canceled) {
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
