import { configureStore } from "@reduxjs/toolkit";

import agentsReducer from "@/features/agents/slice";
import chatReducer from "@/features/chat/slice";
import sessionReducer from "@/features/session/slice";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    session: sessionReducer,
    agents: agentsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
