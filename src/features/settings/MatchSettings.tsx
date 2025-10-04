import type { FormEvent} from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getContestants } from "../../redux/slices/matchSlice";
import type { RootState } from "../../redux/store";
import { runConversation } from "../../redux/thunks/runConversation";

export default function MatchSettings() {
  const [startingContestant, setStartingContestant] = useState<string | null>(null);
  const [numberOfExchanges, setNumberOfExchanges] = useState("");
  const [iceBreaker, setIceBreaker] = useState("Debate: Planes are better than trains");

  const dispatch = useDispatch();
  const contestants = useSelector((state: RootState) => getContestants(state));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!startingContestant || !iceBreaker || !numberOfExchanges) return;
    const exchangesNumber = Number(numberOfExchanges);
    if (Number.isNaN(exchangesNumber)) return;
    dispatch(runConversation(startingContestant, iceBreaker, exchangesNumber));
  };

  return (
    <div className="flex flex-1 px-1 pt-2 pb-1">
      <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">Who should start the conversation?</p>
          <div className="flex items-center gap-2">
            {contestants.map((contestant) => (
              <button
                type="button"
                className={`rounded px-1 py-0.5 text-sm transition-all duration-300 hover:cursor-pointer ${startingContestant === contestant.id ? "ring-1 ring-amber-600" : "ring-1 ring-gray-300"}`}
                onClick={() => setStartingContestant(contestant.id)}
                key={contestant.id}
              >
                {contestant.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm">How long should the conversation go?</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="number-of-exchanges"
              value={numberOfExchanges}
              onChange={(e) => setNumberOfExchanges(e.target.value)}
              className={`w-15 rounded px-2 py-1 text-xs ring-1 transition-all duration-200 placeholder:italic focus:ring-amber-600 focus:outline-none ${numberOfExchanges ? "ring-amber-600/50" : "ring-gray-100"}`}
              placeholder="e.g., 5"
            />
            <p className="text-xs">exchanges</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm">
            Write an ice breaker for{" "}
            <span className="font-semibold text-amber-600">
              {contestants.find((c) => c.id === startingContestant)?.name ?? "..."}
            </span>
          </p>
          <textarea
            id="first-message"
            rows={3}
            value={iceBreaker}
            onChange={(e) => setIceBreaker(e.target.value)}
            className={`w-full resize-none rounded px-2 py-1 text-xs ring-1 transition-all duration-200 placeholder:italic focus:ring-amber-600 focus:outline-none ${iceBreaker ? "ring-amber-600/50" : "ring-gray-100"}`}
            placeholder="e.g., Debate: Is pineapple on pizza acceptable?"
          />
        </div>

        <div className="mt-auto flex items-end justify-end">
          <button
            type="submit"
            disabled={contestants.length < 2}
            className={`bg-amber-600 text-white ${contestants.length < 2 ? "opacity-50" : "hover:cursor-pointer hover:bg-amber-700"} rounded px-2 py-1 text-xs font-semibold shadow-sm transition-colors duration-300`}
          >
            {contestants.length < 2 ? "Set up the contestants to start" : "Start the conversation"}
          </button>
        </div>
      </form>
    </div>
  );
}
