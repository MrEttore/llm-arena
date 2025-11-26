import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Settings({ children }: Props) {
  return (
    <div className="space-y-4 overflow-y-auto border-b border-white/10 pb-4 lg:gap-5 lg:border-r lg:border-b-0 lg:pr-4 lg:pb-0 xl:pr-6 2xl:gap-6">
      {children}
    </div>
  );
}
