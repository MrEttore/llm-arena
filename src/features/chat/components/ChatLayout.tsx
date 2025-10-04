import type { PropsWithChildren } from "react";

export default function ChatLayout({ children }: PropsWithChildren) {
  return <section className="flex flex-1 flex-col">{children}</section>;
}
