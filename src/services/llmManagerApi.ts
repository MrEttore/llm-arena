import type { ApiMessage } from "@/types/domain";

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

type StreamChatCompletionArgs = {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
  onChunk: (chunk: string) => void;
};

export const streamChatCompletion = async ({
  model,
  messages,
  signal,
  onChunk,
}: StreamChatCompletionArgs) => {
  try {
    const stream = await fetch(`${LLM_MANAGER_BASE_URL}/api/v1/openai/chat/stream`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model, messages }),
      signal,
    });

    if (!stream.ok || !stream.body) throw new Error("stream failed");

    const reader = stream.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      // TODO: Is there a more efficient way to parse the stream (without 2 nested loops)?
      for (;;) {
        const newline = buffer.indexOf("\n");
        if (newline === -1) break;
        const line = buffer.slice(0, newline).trim();
        buffer = buffer.slice(newline + 1);

        if (!line || line === "data:" || line === "data: [DONE]") {
          if (line.endsWith("[DONE]")) return;
          continue;
        }

        if (line.startsWith("data:")) {
          const payload = JSON.parse(line.slice(5));
          if (payload.done) return;
          if (payload.content) onChunk(payload.content);
        }
        // if (rawLine.startsWith("event: error")) { ... }
      }
    }
  } catch (error) {
    console.error("getChatCompletion failed:", error);

    throw error;
  }
};
