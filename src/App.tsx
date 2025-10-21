import ChatFooter from "@/features/chat/components/ChatFooter";
import ChatLayout from "@/features/chat/components/ChatLayout";
import ChatMessages from "@/features/chat/components/ChatMessages";
import Settings from "@/features/match/components/Settings";

import ChatHeader from "./features/chat/components/ChatHeader";

export default function App() {
  return (
    <div className="flex h-dvh flex-col px-2 py-2">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_1fr] space-x-2 rounded lg:grid-cols-2 lg:grid-rows-[1fr]">
        <Settings />
        <ChatLayout>
          <ChatHeader />
          <ChatMessages />
          <ChatFooter />
        </ChatLayout>
      </div>
    </div>
  );
}
