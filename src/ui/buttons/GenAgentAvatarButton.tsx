import { Sparkles } from "lucide-react";

type Props = {
  disabled?: boolean;
  onClick: () => void;
};

export default function GenAgentAvatarButton({ disabled = true, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex items-center gap-1 px-2 py-1 font-semibold tracking-wide text-white transition-all duration-300 lg:text-sm 2xl:text-base ${
        disabled
          ? "opacity-50 hover:cursor-not-allowed hover:opacity-50"
          : "hover:cursor-pointer hover:bg-white/5 hover:shadow-xs active:scale-[98%]"
      }`}
    >
      <Sparkles size={12} />
      Generate Avatar
    </button>
  );
}
