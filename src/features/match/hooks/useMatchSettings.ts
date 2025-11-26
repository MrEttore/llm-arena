import { type FormEvent, type MouseEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getAgents, resetAgents } from "@/features/agents/slice";
import type { Agent } from "@/features/agents/types";
import { resetChat } from "@/features/chat/slice";
import { getMatchStatus, resetMatch } from "@/features/match/slice";
import { cancelGenerateResponse, initConversation, runConversation } from "@/features/match/thunks";

export function useMatchSettings() {
  const [startingAgent, setStartingAgent] = useState<Agent | null>(null);
  const [numberOfExchanges, setNumberOfExchanges] = useState("");
  const [iceBreaker, setIceBreaker] = useState("");

  const dispatch = useAppDispatch();
  const agents = useAppSelector(getAgents);
  const matchStatus = useAppSelector(getMatchStatus);

  const isReadyToStart =
    agents.length === 2 &&
    iceBreaker.trim() !== "" &&
    numberOfExchanges.trim() !== "" &&
    startingAgent !== null;

  const handleStart = async (e: FormEvent) => {
    e.preventDefault();

    if (!isReadyToStart || !startingAgent) return;

    const ok = await dispatch(
      initConversation(startingAgent.id, Number(numberOfExchanges), iceBreaker),
    );

    if (ok) dispatch(runConversation());
  };

  const handleCancel = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(cancelGenerateResponse());
  };

  const handleReset = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setStartingAgent(null);
    setIceBreaker("");
    setNumberOfExchanges("");
    dispatch(resetChat());
    dispatch(resetMatch());
    dispatch(resetAgents());
  };

  return {
    fields: {
      startingAgent,
      numberOfExchanges,
      iceBreaker,
    },
    setters: { setStartingAgent, setNumberOfExchanges, setIceBreaker },
    matchStatus,
    isReadyToStart,
    agents,
    handleStart,
    handleCancel,
    handleReset,
  };
}
