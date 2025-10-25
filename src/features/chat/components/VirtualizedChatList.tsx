import { Virtuoso } from "react-virtuoso";

import { useAppSelector } from "@/app/hooks";
import { getMessages } from "@/features/chat/slice";
import ContestantSpeechBubble from "@/features/contestants/components/ContestantSpeechBubble";

function VirtualizedChatList() {
  const messages = useAppSelector(getMessages);

  return (
    <Virtuoso
      data={messages}
      followOutput="smooth"
      style={{ height: "100%" }}
      useWindowScroll={false}
      itemContent={(_, message) => (
        <div className="mx-auto max-w-3xl px-2 py-2">
          <ContestantSpeechBubble key={message.id} message={message} />
        </div>
      )}
    />
  );
}

export default VirtualizedChatList;
