import type { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-xl border border-white/20 bg-gradient-to-br from-white/15 to-white/10 font-medium shadow-2xl backdrop-blur-lg">
      {children}
    </section>
  );
}
