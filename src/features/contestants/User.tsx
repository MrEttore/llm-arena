import type { PropsWithChildren } from "react";

export default function User({ children }: PropsWithChildren) {
  return (
    <div className="flex justify-end">
      <div className="bg-brand/10 ring-brand/20 dark:bg-brand/20 max-w-[75%] rounded-2xl rounded-tr-md p-3 ring-1">
        <p className="leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
