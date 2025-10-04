import ChatHeader from "./features/chat/ChatHeader";
import ChatLayout from "./features/chat/ChatLayout";
import ChatMessages from "./features/chat/ChatMessages";
import Settings from "./features/settings/Settings";

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
