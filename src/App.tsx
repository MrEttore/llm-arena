import ChatHeader from "./features/chat/components/ChatHeader";
import ChatLayout from "./features/chat/components/ChatLayout";
import ChatMessages from "./features/chat/components/ChatMessages";
import Settings from "./features/match/components/Settings";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-white px-7 py-5 dark:bg-gray-700">
      <div className="flex-1 divide-x-1 divide-gray-200 rounded lg:grid lg:grid-cols-2">
        <Settings />
        <ChatLayout>
          <ChatHeader />
          <ChatMessages />
        </ChatLayout>
      </div>
    </div>
  );
}
