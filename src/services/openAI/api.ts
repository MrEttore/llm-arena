import type { ApiMessage } from "@/domain/types";

import { openaiClient } from "./client";

type GetChatCompletionArgs = {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
};

export const getChatCompletion = async ({
  model,
  messages,
  signal,
}: GetChatCompletionArgs): Promise<string | undefined> => {
  try {
    const response = await openaiClient.chat.completions.create(
      {
        model,
        messages: messages,
      },
      { signal },
    );
    const completion = response.choices[0]?.message?.content as string;
    return completion;
  } catch (error) {
    console.error("getChatCompletion failed:", error);

    throw error;
  }
};
