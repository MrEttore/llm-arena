import MatchSettings from './features/settings/MatchSettings';
import ContestantSettings from './features/settings/ContestantSettings';
import ChatHeader from './features/chat/ChatHeader';
import ChatLayout from './features/chat/ChatLayout';
import ChatMessages from './features/chat/ChatMessages';
import Sidebar from './features/sidebar/Sidebar';

export default function App() {
  return (
    <div className="min-h-dvh flex bg-gray-50 dark:bg-gray-950">
      {/* Sidebar (collapsible on mobile) */}
      {/* <Sidebar /> */}

      {/* Main chat column */}
      <ChatLayout>
        {/* Top bar */}
        <ChatHeader />
        <MatchSettings />

        {/* Messages scroller */}
        <ChatMessages />
      </ChatLayout>
    </div>
  );
}
