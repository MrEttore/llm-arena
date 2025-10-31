import { AudioLines } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import type { ChatMessage } from "@/types";

import { getContestantById } from "../slice";

type Props = {
  message: ChatMessage;
};

export default function ContestantSpeechBubble({ message }: Props) {
  const { content, authorId, status } = message;
  const { contestant, index } = useAppSelector((state) => getContestantById(state, authorId));
  const side = index === 0 ? "left" : "right";

  return (
    <div className={`flex space-y-1 ${side === "right" ? "justify-end" : "justify-start"} `}>
      <div
        className={`flex w-fit max-w-[75%] flex-col space-y-1 rounded-2xl ${side === "right" ? "rounded-tr-sm" : "rounded-tl-sm"} border-1 border-white/10 px-3 py-2 leading-snug break-words whitespace-pre-wrap text-white shadow backdrop-blur-2xl`}
      >
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-light italic opacity-75">
            <span className="font-semibold">{contestant?.name}</span> ({contestant?.model})
          </p>
          <AudioLines
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-white/20"
            onClick={() => console.log("Speak!")}
          />
        </div>

        {status === "sent" && <p className={`text-xs`}>{content}</p>}
        {status === "pending" && (
          <p className={`animate-pulse text-xs font-light italic`}>thinking...</p>
        )}
      </div>
    </div>
  );
}
