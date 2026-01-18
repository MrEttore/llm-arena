import { AgentCarousel } from "@/features/agents/components";
import { /*ChatFooter, ChatHeader,*/ ChatLayout, ChatMessages } from "@/features/chat/components";
import { SessionSettings, Settings } from "@/features/session/components";
import { AppFooter, AppHeader } from "@/ui/layout";

export default function App() {
  return (
    <div className="flex h-dvh flex-col text-white">
      <AppHeader />
      <main className="flex min-h-0 flex-1 flex-col px-3 py-4 backdrop-blur sm:px-2 lg:px-4">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
          <Settings>
            <AgentCarousel />
            <SessionSettings />
          </Settings>
          <ChatLayout>
            {/* <ChatHeader /> */}
            <ChatMessages />
            {/* <ChatFooter /> */}
          </ChatLayout>
        </div>
      </main>
      <AppFooter />
    </div>
  );
}
