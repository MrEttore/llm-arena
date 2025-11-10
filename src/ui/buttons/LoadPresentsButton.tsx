import { Dices } from "lucide-react";

type Props = {
  onLoad: () => void;
};

export default function LoadPresentsButton({ onLoad }: Props) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className="flex items-center gap-1 rounded-lg border-1 border-transparent px-2 py-1 font-semibold tracking-wider text-white transition-all duration-300 hover:cursor-pointer hover:border-white/5 hover:bg-white/5 hover:shadow-xs active:scale-[98%] lg:text-xs 2xl:text-sm"
    >
      <Dices size={12} />
      Load Preset
    </button>
  );
}
