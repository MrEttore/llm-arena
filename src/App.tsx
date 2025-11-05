import ChatFooter from "@/features/chat/components/ChatFooter";
import ChatLayout from "@/features/chat/components/ChatLayout";
import ChatMessages from "@/features/chat/components/ChatMessages";
import Settings from "@/features/match/components/Settings";

import ChatHeader from "./features/chat/components/ChatHeader";

export default function App() {
  return (
    <div className="flex h-dvh flex-col lg:p-2 2xl:p-6">
      <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_1fr] rounded lg:grid-cols-2 lg:grid-rows-[1fr] lg:space-x-2 2xl:space-x-6">
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
