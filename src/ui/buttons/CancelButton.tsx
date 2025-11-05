import { Square } from "lucide-react";
import type { MouseEvent } from "react";

type Props = {
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
};

function CancelButton({ onCancel }: Props) {
  return (
    <button
      type="button"
      onClick={onCancel}
      className={`flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80 active:scale-[99%] lg:text-xs 2xl:text-sm`}
    >
      <Square size={12} strokeWidth={2} />
      <p>Cancel conversation</p>
    </button>
  );
}

export default CancelButton;
