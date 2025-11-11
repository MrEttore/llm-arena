import { VirtualizedChatList } from "@/features/chat/components";

export default function ChatMessages() {
  return (
    <div className="min-h-0 flex-1 overflow-hidden">
      <VirtualizedChatList />
    </div>
  );
}
