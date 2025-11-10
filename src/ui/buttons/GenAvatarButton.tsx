import { Sparkles } from "lucide-react";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function GenAvatarButton({ disabled = false, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-1 rounded-lg border-1 border-transparent px-2 py-1 font-semibold text-white transition-all duration-300 lg:text-xs 2xl:text-sm ${
        disabled
          ? "opacity-50 hover:cursor-not-allowed hover:opacity-50"
          : "hover:cursor-pointer hover:border-white/5 hover:bg-white/5 hover:shadow-xs active:scale-[98%]"
      }`}
    >
      <Sparkles size={12} />
      Generate Avatar
    </button>
  );
}
