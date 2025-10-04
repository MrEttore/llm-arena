import OpenAI from "openai";

import type { ApiMessage } from "@/domain/types";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

type GetChatCompletionArgs = {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
};

export const getChatCompletion = async ({
  model,
  messages,
}: GetChatCompletionArgs): Promise<string | undefined> => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: messages,
    });
    const completion = response.choices[0]?.message?.content as string;
    return completion;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
  }
};
