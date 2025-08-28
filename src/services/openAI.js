import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const getChatCompletion = async ({ userPrompt }) => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userPrompt },
      ],
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error('Error fetching chat completion:', error);
  }
};
