import { type FormEvent, type MouseEvent, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { resetChat } from "@/features/chat/slice";
import { getContestants, resetContestants } from "@/features/contestants/slice";
import { getMatchStatus, resetMatch } from "@/features/match/slice";
import { initConversation } from "@/features/match/thunks/initConversation";
import { runConversation } from "@/features/match/thunks/runConversation";
import type { Contestant } from "@/types";

import { cancelGenerateResponse } from "../thunks/generateResponse";

export function useMatchControl() {
  const [startingContestant, setStartingContestant] = useState<Contestant | null>(null);
  const [numberOfExchanges, setNumberOfExchanges] = useState("");
  const [iceBreaker, setIceBreaker] = useState("");

  const dispatch = useAppDispatch();
  const contestants = useAppSelector(getContestants);
  const matchStatus = useAppSelector(getMatchStatus);

  const handleNumberOfExchangesChange = (value: string) => setNumberOfExchanges(value);
  const handleStartingContestantChange = (value: Contestant) => setStartingContestant(value);
  const handleIceBreakerChange = (value: string) => setIceBreaker(value);

  const isRunning = matchStatus === "running";
  const isReadyToStart =
    contestants.length === 2 &&
    iceBreaker.trim() !== "" &&
    numberOfExchanges.trim() !== "" &&
    startingContestant !== null;

  const handleStart = async (e: FormEvent) => {
    e.preventDefault();

    if (!isReadyToStart || !startingContestant) return;

    const ok = await dispatch(
      initConversation(startingContestant.id, Number(numberOfExchanges), iceBreaker),
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
    setStartingContestant(null);
    setIceBreaker("");
    setNumberOfExchanges("");
    dispatch(resetChat());
    dispatch(resetMatch());
    dispatch(resetContestants());
  };

  return {
    fields: {
      startingContestant,
      numberOfExchanges,
      iceBreaker,
    },
    handleNumberOfExchangesChange,
    handleStartingContestantChange,
    handleIceBreakerChange,
    matchStatus,
    isRunning,
    isReadyToStart,
    handleStart,
    handleCancel,
    handleReset,
    contestants,
  };
}
