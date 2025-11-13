import { Dices } from "lucide-react";

type Props = {
  onLoad: () => void;
};

export default function LoadPresentsButton({ onLoad }: Props) {
  return (
    <button
      type="button"
      onClick={onLoad}
      className="flex items-center gap-1 px-2 py-1 font-semibold tracking-wide text-white transition-all duration-300 hover:cursor-pointer hover:bg-white/5 hover:shadow-xs active:scale-[98%] lg:text-sm 2xl:text-base"
    >
      <Dices size={12} />
      Load Preset
    </button>
  );
}
