export type ApiMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
