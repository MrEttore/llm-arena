import { createAsyncThunk } from "@reduxjs/toolkit";

import type { AppDispatch, RootState } from "@/app/store";
import { buildGenerateAvatarPrompt } from "@/features/agents/utils";
import { generateImage } from "@/services/llmManager";

type GenerateAvatarArgs = {
  agentId: string;
  name: string;
  personality: string;
};

type FulfilledPayload = {
  agentId: string;
  avatarUrl: string;
};

type RejectedPayload = { message: string };

export const generateAvatar = createAsyncThunk<
  FulfilledPayload,
  GenerateAvatarArgs,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: RejectedPayload;
  }
>("agents/generateAvatar", async ({ agentId, name, personality }, { rejectWithValue }) => {
  try {
    const prompt = buildGenerateAvatarPrompt(name, personality);
    const avatar = await generateImage({ prompt });

    return { agentId, avatarUrl: avatar.url };
  } catch (error) {
    return rejectWithValue({ message: `${error}` });
  }
});
