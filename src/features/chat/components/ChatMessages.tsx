import { VirtualizedChatList } from "@/features/chat/components";

export default function ChatMessages() {
  return (
    <div className="min-h-0 flex-1 overflow-hidden border-b-1 border-white/10">
      <VirtualizedChatList />
    </div>
  );
}
