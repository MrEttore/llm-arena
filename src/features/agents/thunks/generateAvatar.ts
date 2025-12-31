import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import { generateImage } from "@/services/llmManager";

export type GenerateAvatarArgs = {
  agentId: string;
  personality: string;
};

type FulfilledPayload = {
  agentId: string;
  avatarUrl: string;
};

export type RejectedPayload = { message: string };

export const generateAvatar = createAsyncThunk<
  FulfilledPayload,
  GenerateAvatarArgs,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectedPayload;
  }
>("agents/generateAvatar", async ({ agentId, personality }, { rejectWithValue }) => {
  try {
    // TODO: Transform personality into prompt.
    // Build prompt fn.

    const avatar = await generateImage({ prompt: personality });

    return { agentId, avatarUrl: avatar.url };
  } catch (error) {
    return rejectWithValue({ message: `${error}` });
  }
});
