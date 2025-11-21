import { BrushCleaning } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function ClearButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 font-semibold tracking-wider text-red-700 transition-all duration-300 hover:cursor-pointer hover:bg-red-700/10 hover:shadow-xs active:scale-[98%] lg:text-sm 2xl:text-base"
    >
      <BrushCleaning size={12} />
      Clear
    </button>
  );
}
