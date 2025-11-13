import { RotateCcw } from "lucide-react";
import type { MouseEvent } from "react";

type Props = {
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function ResetButton({ disabled = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 rounded-xl border-1 border-transparent px-2 py-1 font-semibold tracking-wider text-white transition-all duration-300 lg:text-sm 2xl:text-base ${
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-white/5 hover:bg-white/5 hover:shadow-xs active:scale-[98%]"
      }`}
    >
      <RotateCcw size={12} strokeWidth={2} />
      <p>Reset</p>
    </button>
  );
}
