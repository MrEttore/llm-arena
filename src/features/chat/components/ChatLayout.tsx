import type { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/10 p-3 font-medium shadow-sm backdrop-blur sm:p-4 lg:gap-6 lg:p-5">
      {children}
    </div>
  );
}
