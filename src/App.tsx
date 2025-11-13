import { /*ChatFooter, ChatHeader,*/ ChatLayout, ChatMessages } from "@/features/chat/components";
import { Settings } from "@/features/match/components";
import { AppFooter, AppHeader } from "@/ui/layout";

export default function App() {
  return (
    <div className="flex h-dvh flex-col text-white">
      <AppHeader />
      <main className="flex min-h-0 flex-1 flex-col px-3 py-4 backdrop-blur sm:px-4 lg:px-6 xl:px-8">
        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-2">
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
