import { Play } from "lucide-react";

type Props = {
  isReadyToStart: boolean;
  isConversationCanceled: boolean;
};

function StartButton({ isReadyToStart, isConversationCanceled }: Props) {
  return (
    <button
      type="submit"
      disabled={!isReadyToStart || isConversationCanceled}
      className={`flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 ${
        !isReadyToStart || isConversationCanceled
          ? "opacity-50 hover:cursor-not-allowed hover:opacity-50"
          : "hover:cursor-pointer hover:opacity-80"
      }`}
    >
      <Play size={12} strokeWidth={2} />
      <p>Start conversation</p>
    </button>
  );
}

export default StartButton;
