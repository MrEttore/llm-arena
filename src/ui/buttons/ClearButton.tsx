import { BrushCleaning } from "lucide-react";

type Props = {
  onClear: () => void;
};

function ClearButton({ onClear }: Props) {
  return (
    <button
      type="button"
      onClick={onClear}
      // className="flex items-center gap-1 rounded-lg border-1 border-red-700/30 bg-red-700/15 px-2 py-1 text-xs font-semibold text-red-700 shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80 active:scale-[98%]"
      className="flex items-center gap-1 rounded-lg border-1 border-transparent px-2 py-1 text-xs font-semibold tracking-wider text-red-700 transition-all duration-300 hover:cursor-pointer hover:border-red-700/10 hover:bg-red-700/10 hover:shadow-xs active:scale-[98%]"
    >
      <BrushCleaning size={12} />
      Clear
    </button>
  );
}

export default ClearButton;
