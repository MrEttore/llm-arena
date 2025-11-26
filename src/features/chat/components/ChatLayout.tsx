import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ChatLayout({ children }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/10 p-3 font-medium shadow-sm backdrop-blur sm:p-4 lg:gap-6 lg:p-5">
      {children}
    </div>
  );
}
