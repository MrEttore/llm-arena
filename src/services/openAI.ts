import OpenAI from "openai";

import type { ApiMessage } from "../types/domain";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface GetChatCompletionArgs {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
}

export const getChatCompletion = async ({
  model,
  messages,
}: GetChatCompletionArgs): Promise<string | undefined> => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages: messages as any, // OpenAI SDK type mismatch vs our simplified shape
    });
    const completion = response.choices[0]?.message?.content;
    return completion;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
  }
};
