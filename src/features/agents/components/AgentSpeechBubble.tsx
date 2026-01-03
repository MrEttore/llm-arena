import { AudioLines } from "lucide-react";

import { useAppSelector } from "@/app/hooks";
import { AgentAvatar } from "@/features/agents/components";
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
  const avatar = agent?.avatar ?? "";

  return (
    <div className={`flex py-1 ${side === "right" ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex w-full max-w-[92%] flex-col space-y-2 rounded-2xl ${side === "right" ? "rounded-tr-sm" : "rounded-tl-sm"} border-1 border-white/10 px-3 py-2 leading-snug break-words whitespace-pre-wrap text-white shadow backdrop-blur-2xl sm:max-w-[85%] lg:max-w-[72%] xl:max-w-[65%]`}
      >
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2 sm:gap-2.5">
            <AgentAvatar src={avatar} size="small" />

            <div className="min-w-0 leading-tight">
              <p className="truncate text-xs font-medium text-white/90 sm:text-sm">
                {agent?.name ?? "Unknown agent"}
              </p>
              <p className="truncate text-[11px] font-light text-white/60 italic sm:text-xs">
                {agent?.model ?? ""}
              </p>
            </div>
          </div>

          <AudioLines
            className="rounded-lg p-1 hover:cursor-pointer hover:bg-white/20"
            onClick={() => console.log("Speak!")}
          />
        </div>

        {status === "pending" && (
          <p className="animate-pulse text-xs font-light text-white/70 italic">thinking…</p>
        )}

        {(status === "streaming" || status === "sent") && (
          <p className="relative font-light sm:text-base lg:text-sm 2xl:text-base">
            {resolvedContent}
          </p>
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
