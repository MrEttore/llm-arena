import { Square } from "lucide-react";
import type { MouseEvent } from "react";

type Props = {
  disabled?: boolean;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function CancelButton({ disabled = false, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 font-semibold text-white shadow-md transition-all duration-300 lg:text-xs 2xl:text-sm ${
        disabled ? "cursor-not-allowed opacity-50" : "hover:opacity-80 active:scale-[99%]"
      }`}
    >
      <Square size={12} strokeWidth={2} />
      <p>Cancel conversation</p>
    </button>
  );
}
