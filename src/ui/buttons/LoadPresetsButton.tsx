import { Dices } from "lucide-react";

type Props = {
  onClick: () => void;
};

export default function LoadPresetsButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-1 px-2 py-1 font-semibold tracking-wide text-white transition-all duration-300 hover:cursor-pointer hover:bg-white/5 hover:shadow-xs active:scale-[98%] lg:text-sm 2xl:text-base"
    >
      <Dices size={12} />
      Load Preset
    </button>
  );
}
