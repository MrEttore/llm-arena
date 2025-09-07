import MatchSettings from "./features/settings/MatchSettings";
import ContestantSettings from "./features/settings/ContestantSettings";
import ChatHeader from "./features/chat/ChatHeader";
import ChatLayout from "./features/chat/ChatLayout";
import ChatMessages from "./features/chat/ChatMessages";

export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-gray-50 px-7 py-5 dark:bg-gray-900">
      <div className="grid flex-1 grid-cols-2 divide-x-1 divide-gray-800 rounded dark:bg-gray-950 dark:text-gray-200">
        <MatchSettings />
        <ChatLayout>
          <ChatHeader />
          <ChatMessages />
        </ChatLayout>
      </div>
    </div>
  );
}
