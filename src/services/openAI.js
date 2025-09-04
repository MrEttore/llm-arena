import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatCompletion = async ({ model, messages }) => {
  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching chat completion:', error);
  }
};
