import type { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
  return <div className="flex min-h-0 flex-1 flex-col font-medium">{children}</div>;
}
