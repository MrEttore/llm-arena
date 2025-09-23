import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatCompletion = async ({ model, messages }) => {
  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
    });
    const completion = response.choices[0].message.content;
    return completion;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
  }
};
