import { useEffect, useRef, useState } from "react";
import { Virtuoso, type VirtuosoHandle } from "react-virtuoso";

import { useAppSelector } from "@/app/hooks";
import { getMessages } from "@/features/chat/slice";
import { ContestantSpeechBubble } from "@/features/contestants/components";

function VirtualizedChatList() {
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [unseenCount, setUnseenCount] = useState(0);

  const virtuosoRef = useRef<VirtuosoHandle | null>(null);
  const previousLengthRef = useRef(0);

  const messages = useAppSelector(getMessages);

  useEffect(() => {
    const previousLength = previousLengthRef.current;
    const currentLength = messages.length;

    if (!isAtBottom && currentLength > previousLength) {
      setUnseenCount((count) => count + (currentLength - previousLength));
    }

    if (isAtBottom) setUnseenCount(0);

    previousLengthRef.current = currentLength;
  }, [isAtBottom, messages.length]);

  const handleBottomStateChange = (atBottom: boolean) => {
    setIsAtBottom(atBottom);
    if (atBottom) setUnseenCount(0);
  };

  const handleJumpToLatest = () => {
    const count = messages.length;
    if (!count) return;

    virtuosoRef.current?.scrollToIndex({
      index: count - 1,
      align: "end",
      behavior: "smooth",
    });
  };

  return (
    <div className="relative h-full w-full">
      <Virtuoso
        ref={virtuosoRef}
        data={messages}
        followOutput={isAtBottom ? "smooth" : false}
        atBottomStateChange={handleBottomStateChange}
        style={{ height: "100%" }}
        useWindowScroll={false}
        itemContent={(_, message) => (
          <div className="mx-auto w-full max-w-2xl py-2 sm:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <ContestantSpeechBubble key={message.id} message={message} />
          </div>
        )}
      />

      {!isAtBottom && unseenCount > 0 && (
        <button
          type="button"
          onClick={handleJumpToLatest}
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-slate-900 shadow-lg backdrop-blur transition hover:cursor-pointer hover:bg-white sm:text-sm"
        >
          {unseenCount} new {unseenCount === 1 ? "message" : "messages"}
          <span className="text-slate-600">Jump to latest</span>
        </button>
      )}
    </div>
  );
}

export default VirtualizedChatList;
