export type SessionState = {
  status: "idle" | "running" | "completed" | "error" | "canceled";
  fetchingResponse: boolean;
  numberOfExchanges?: number;
  error?: string;
};
