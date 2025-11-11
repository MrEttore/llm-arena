import { BrushCleaning } from "lucide-react";

type Props = {
  onClear: () => void;
};

export default function ClearButton({ onClear }: Props) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="flex items-center gap-1 px-2 py-1 font-semibold tracking-wider text-red-700 transition-all duration-300 hover:cursor-pointer hover:bg-red-700/10 hover:shadow-xs active:scale-[98%] lg:text-xs 2xl:text-sm"
    >
      <BrushCleaning size={12} />
      Clear
    </button>
  );
}
