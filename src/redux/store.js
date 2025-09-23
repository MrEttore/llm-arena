import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chatSlice";
import matchSlice from "./slices/matchSlice";

export const store = configureStore({
  reducer: {
    chat: chatSlice,
    match: matchSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
