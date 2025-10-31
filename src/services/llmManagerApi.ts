import type { ApiMessage } from "@/types";

const LLM_MANAGER_BASE_URL = import.meta.env.VITE_LLM_MANAGER_BASE_URL;

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
    const response = await fetch(`${LLM_MANAGER_BASE_URL}/api/v1/openai/chat/completion`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages }),
      signal,
    });

    if (!response.ok || !response.body) throw new Error("Completion from llm-manager failed");

    const data = await response.json();
    console.log("Data from the llm-manager: ", data);

    return data.content;
  } catch (error) {
    console.error("getChatCompletion failed:", error);

    throw error;
  }
};

// export const streamChatCompletion = async ({
//   model,
//   messages,
//   signal,
// }: GetChatCompletionArgs): Promise<string | undefined> => {
//   try {
//     const stream = await openaiClient.chat.completions.create(
//       {
//         model,
//         messages: messages,
//         stream: true,
//       },
//       { signal },
//     );

//     for await (const chunk of stream) {
//       console.log(chunk.choices[0]?.delta?.content as string);
//     }

//     const reader = stream.body;

//     return stream;
//   } catch (error) {
//     console.error("getChatCompletion failed:", error);

//     throw error;
//   }
// };
