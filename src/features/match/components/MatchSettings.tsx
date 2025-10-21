import { Play } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/app/hooks";
import type { Contestant } from "@/domain/types";
import { getContestants } from "@/features/contestants/slice";
import { runConversation } from "@/features/match/thunks/runConversation";

import { initConversation } from "../thunks/initConversation";

export default function MatchSettings() {
  const [startingContestant, setStartingContestant] = useState<Contestant | null>(null);
  const [numberOfExchanges, setNumberOfExchanges] = useState("");
  const [iceBreaker, setIceBreaker] = useState("");

  const dispatch = useAppDispatch();
  const contestants = useAppSelector((state) => getContestants(state));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!startingContestant || !iceBreaker || !numberOfExchanges) return;

    const ok = await dispatch(
      initConversation(startingContestant.id, Number(numberOfExchanges), iceBreaker),
    );

    if (!ok) return;

    dispatch(runConversation());
  };

  return (
    <div className="flex flex-1 flex-col space-y-2 rounded-xl border-1 border-white/20 bg-linear-to-br from-white/15 to-white/10 p-2 font-medium shadow-2xl backdrop-blur-lg">
      <h3 className={`flex items-center justify-center gap-1 text-white`}>Match Settings</h3>
      <form className="flex flex-1 flex-col space-y-2" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <label htmlFor="number-of-exchanges" className="text-xs text-white/80">
            Number of Exchanges
          </label>
          <input
            type="text"
            id="number-of-exchanges"
            value={numberOfExchanges}
            onChange={(e) => setNumberOfExchanges(e.target.value)}
            className={`w-15 rounded-lg border-1 border-white/10 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic hover:border-white/30 focus:border-white/40 focus:outline-none sm:text-xs`}
            placeholder="e.g., 5"
          />
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="conversation-starter" className="text-xs text-white/80">
            Who starts?
          </label>
          <div className="flex min-w-15 items-center justify-around overflow-hidden rounded-lg border-1 border-white/10">
            {contestants.length ? (
              contestants.map((contestant) => (
                <button
                  key={contestant.id}
                  onClick={() => setStartingContestant(contestant)}
                  className={`cursor-pointer px-2 py-1 text-xs text-white transition-colors duration-300 ${startingContestant?.id === contestant.id ? "bg-white/15" : "hover:bg-white/5"}`}
                >
                  {contestant.name}
                </button>
              ))
            ) : (
              <>
                <p className={`s px-2 py-1 text-xs text-white`}>?</p>
                <p className={`s px-2 py-1 text-xs text-white`}>?</p>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="conversation-starter" className={`text-xs text-white/80`}>
            {startingContestant ? `${startingContestant.name}'s ice breaker` : "Ice Breaker"}
          </label>
          <textarea
            id="ice-breaker"
            rows={2}
            value={iceBreaker}
            onChange={(e) => setIceBreaker(e.target.value)}
            className={`flex-1 resize-none rounded-lg border-1 border-white/10 px-2 py-1 transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic hover:border-white/30 focus:border-white/40 focus:outline-none sm:text-xs dark:text-gray-200`}
            placeholder="e.g., Debate: Is pineapple on pizza acceptable?"
          />
        </div>

        <div className="mt-auto flex items-end justify-end">
          <button
            type="submit"
            disabled={contestants.length !== 2}
            className={`flex items-center gap-0.5 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 ${contestants.length !== 2 ? "opacity-50 hover:cursor-not-allowed hover:opacity-50" : "hover:cursor-pointer hover:opacity-80"}`}
          >
            {contestants.length === 2 && numberOfExchanges && iceBreaker ? (
              <>
                <Play size={12} strokeWidth={2} /> Start the conversation
              </>
            ) : (
              <>Set up the contestants to start</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
