import { useEffect, useRef } from "react";

import { useAppSelector } from "@/app/hooks";
import { getMessages } from "@/features/chat/slice";
import ContestantSpeechBubble from "@/features/contestants/components/ContestantSpeechBubble";
import { isNearBottom } from "@/utils/isNearBottom";

export default function ChatMessages() {
  const messages = useAppSelector(getMessages);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPinnedToBottomRef = useRef<boolean>(true);

  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    isPinnedToBottomRef.current = isNearBottom(container);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isPinnedToBottomRef) return;

    requestAnimationFrame(() => {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages.length]);

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="min-h-0 flex-1 overflow-y-auto overscroll-contain border-b-1 border-white/10 p-2"
    >
      <div className="mx-auto max-w-3xl space-y-4">
        {messages.map((message) => (
          <ContestantSpeechBubble message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
}
