import { /*ChatFooter, ChatHeader,*/ ChatLayout, ChatMessages } from "@/features/chat/components";
import { Settings } from "@/features/match/components";
import { AppFooter, AppHeader } from "@/ui/layout";

export default function App() {
  return (
    <div className="flex h-dvh flex-col">
      <AppHeader />
      <main className="flex flex-1 flex-col overflow-hidden bg-white/5 backdrop-blur-xl">
        <div className="grid min-h-0 flex-1 grid-cols-2 lg:px-1 2xl:px-5">
          <Settings />
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
