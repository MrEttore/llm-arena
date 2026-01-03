import type { ApiMessage } from "@/types/domain";

export type GetChatCompletionArgs = {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
};

export type GetChatCompletionResponse = string | undefined;

export type StreamChatCompletionArgs = {
  model: string;
  messages: ApiMessage[];
  signal?: AbortSignal;
  onChunk: (chunk: string) => void;
};

export type StreamChatCompletionResponse = void;

export type GenerateImageArgs = {
  prompt: string;
  model?: string;
  n?: number;
  quality?: string;
  size?: string;
};

export type GenerateImageResponse = {
  url: string;
  meta: {
    created: string;
    size: string;
    quality: string;
    outputFormat: string;
  };
};
