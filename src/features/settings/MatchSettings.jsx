import { useMutation } from '@tanstack/react-query';
import { getChatCompletion } from '../../services/openAI';
import { useState } from 'react';

export default function MatchSettings() {
  const [conversationStarter, setConversationStarter] = useState('');

  const { isPending, isError, isSuccess, mutate } = useMutation({
    mutationFn: getChatCompletion,
    onSuccess: (data) => {
      console.log('AI Response:', data);

      // TODO: dispatch action to add response to messages list

      // mutate({ userPrompt: data });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!conversationStarter) return;
    mutate({ userPrompt: conversationStarter });
  };

  return (
    <div className="border-b border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-950/80 backdrop-blur">
      <div className="px-4 py-3">
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <label htmlFor="conversationStarter" className="sr-only">
            Start a conversation
          </label>
          <textarea
            id="conversationStarter"
            value={conversationStarter}
            onChange={(e) => setConversationStarter(e.target.value)}
            rows={1}
            placeholder="Type a message to start the conversation..."
            className="min-h-11 max-h-40 flex-1 resize-y rounded-xl border-gray-300 bg-white/90 px-3 py-2 shadow-sm outline-none focus:ring-1 focus:ring-gray-600 dark:bg-gray-900 dark:border-gray-800 transition-all duration-200"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-xl bg-brand px-4 font-medium text-white hover:opacity-90 focus:outline-none hover:ring-1 hover:ring-gray-600 transition-all duration-200 hover:cursor-pointer"
          >
            Start
          </button>
        </form>
      </div>
    </div>
  );
}
