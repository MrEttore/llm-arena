import { AudioLines } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import type { ChatMessage } from "@/types";

import { getContestantById } from "../slice";

type Props = {
  message: ChatMessage;
};

export default function ContestantSpeechBubble({ message }: Props) {
  const { content, authorId, status, stream } = message;
  const { contestant, index } = useAppSelector((state) => getContestantById(state, authorId));
  const side = index === 0 ? "left" : "right";
  const resolvedContent =
    status === "streaming" ? (stream?.chunks.join("") ?? "") : (content ?? "");

  return (
    <div className={`flex space-y-1 ${side === "right" ? "justify-end" : "justify-start"}`}>
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

        {status === "pending" && (
          <p className="animate-pulse text-xs font-light text-white/70 italic">thinking…</p>
        )}

        {(status === "streaming" || status === "sent") && (
          <p className="relative text-xs">{resolvedContent}</p>
        )}

        {status === "error" && (
          <p className="text-xs font-semibold text-rose-300">Something went wrong.</p>
        )}

        {status === "canceled" && (
          <p className="text-xs font-light text-white/60 italic">Response canceled.</p>
        )}
      </div>
    </div>
  );
}
