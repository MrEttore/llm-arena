import type { Agent } from "@/features/agents/types";

type Props = {
  agent?: Agent;
};

export default function AgentProfile({ agent }: Props) {
  return (
    <div className="flex flex-col items-center text-white">
      {agent ? (
        <>
          <p className="font-semibold">{agent.name}</p>
          <p className="text-xs italic opacity-50">{agent.model}</p>
        </>
      ) : (
        <p className="font-semibold opacity-50">?</p>
      )}
    </div>
  );
}
