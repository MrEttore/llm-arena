import { AudioLines } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import { getAgentIdAndIndex } from "@/features/agents/slice";
import type { ChatMessage } from "@/features/chat/types";

type Props = {
  message: ChatMessage;
};

export default function AgentSpeechBubble({ message }: Props) {
  const { content, authorId, status, stream } = message;
  const { agent, index } = useAppSelector((state) => getAgentIdAndIndex(state, authorId));
  const side = index === 0 ? "left" : "right";
  const resolvedContent =
    status === "streaming" ? (stream?.chunks.join("") ?? "") : (content ?? "");

  return (
    <div className={`flex py-1 ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex w-full max-w-[92%] flex-col space-y-1 rounded-2xl ${side === "right" ? "rounded-tr-sm" : "rounded-tl-sm"} border-1 border-white/10 px-3 py-2 leading-snug break-words whitespace-pre-wrap text-white shadow backdrop-blur-2xl sm:max-w-[85%] lg:max-w-[72%] xl:max-w-[65%]`}
      >
        <div className="flex items-center gap-2">
          <p className="text-[10px] font-light italic opacity-75">
            <span className="font-semibold">{agent?.name}</span> ({agent?.model})
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
          <p className="relative sm:text-base lg:text-sm 2xl:text-base">{resolvedContent}</p>
        )}

        {status === "error" && (
          <p className="font-semibold text-rose-300 sm:text-base lg:text-sm 2xl:text-base">
            Something went wrong.
          </p>
        )}

        {status === "canceled" && (
          <p className="font-light text-white/60 italic sm:text-base lg:text-sm 2xl:text-base">
            Response canceled.
          </p>
        )}
      </div>
    </div>
  );
}
