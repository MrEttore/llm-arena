import { Play } from "lucide-react";

type Props = {
  disabled?: boolean;
};

export default function StartButton({ disabled = false }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`flex items-center gap-1 rounded-xl border-1 border-white/30 bg-white/15 px-2 py-1 font-semibold text-white shadow-md transition-all duration-300 lg:text-sm 2xl:text-base ${
        disabled
          ? "opacity-50 hover:cursor-not-allowed hover:opacity-50"
          : "hover:cursor-pointer hover:opacity-80 active:scale-[98%]"
      }`}
    >
      <Play size={12} strokeWidth={2} />
      <p>Start conversation</p>
    </button>
  );
}
