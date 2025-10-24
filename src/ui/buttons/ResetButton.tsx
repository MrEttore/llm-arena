import { RotateCcw } from "lucide-react";
import type { MouseEvent } from "react";

type Props = {
  onReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

function ResetButton({ onReset }: Props) {
  return (
    <button
      type="button"
      onClick={onReset}
      className={`flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80 active:scale-[98%]`}
    >
      <RotateCcw size={12} strokeWidth={2} />
      <p>Start over</p>
    </button>
  );
}

export default ResetButton;
