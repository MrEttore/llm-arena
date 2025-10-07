import { configureStore } from "@reduxjs/toolkit";

import chatReducer from "@/features/chat/slice";
import contestantsReducer from "@/features/contestants/slice";
import matchReducer from "@/features/match/slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    match: matchReducer,
    contestants: contestantsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
