import { useAppSelector } from "@/app/hooks";
import ContestantSpeechBubble from "@/features/contestants/components/ContestantSpeechBubble";

import { getMessages } from "../slice";

export default function ChatMessages() {
  const messages = useAppSelector(getMessages);

  return (
    <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-b-1 border-white/10 p-2">
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.map((message) => (
          <ContestantSpeechBubble message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
}
