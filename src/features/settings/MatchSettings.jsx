import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContestants } from "../../redux/slices/matchSlice";
import { runConversation } from "../../redux/thunks/runConversation";

export default function MatchSettings() {
  const [startingContestant, setStartingContestant] = useState(null);
  const [numberOfExchanges, setNumberOfExchanges] = useState("");
  const [iceBreaker, setIceBreaker] = useState(
    "Debate: Planes are better than trains",
  );

  const dispatch = useDispatch();
  const contestants = useSelector(getContestants);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: add error
    if (!startingContestant || !iceBreaker || !numberOfExchanges) return;

    dispatch(
      runConversation(startingContestant, iceBreaker, numberOfExchanges),
    );
  };

  return (
    <div className="flex flex-1 border-t-1 border-gray-800/50 px-1 pt-2 pb-1">
      <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">Who starts the conversation?</p>
          <div className="flex items-center gap-2">
            {contestants.map((contestant) => (
              <button
                type="button"
                className={`rounded px-1 py-0.5 text-sm transition-all duration-300 hover:cursor-pointer ${startingContestant === contestant.id ? "ring-1 ring-amber-600" : "ring-2 ring-gray-900"}`}
                onClick={() => setStartingContestant(contestant.id)}
                key={contestant.id}
              >
                {contestant.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-semibold">
            How long should the conversation go?
          </p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              id="number-of-exchanges"
              value={numberOfExchanges}
              onChange={(e) => setNumberOfExchanges(e.target.value)}
              className="w-15 rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
              placeholder="e.g., 5"
            />
            <p className="text-xs">exchanges</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold">
            Write an ice breaker for{" "}
            <span className="text-amber-600">
              {contestants.find((c) => c.id === startingContestant)?.name ??
                "..."}
            </span>
          </p>
          <textarea
            id="first-message"
            rows={3}
            value={iceBreaker}
            onChange={(e) => setIceBreaker(e.target.value)}
            className="w-full resize-none rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
            placeholder="e.g., Debate: Is pineapple on pizza acceptable?"
          />
        </div>
        <div className="mt-auto flex items-end justify-center">
          <button
            type="submit"
            disabled={contestants.length < 2}
            className={`${contestants.length < 2 ? "bg-amber-600/50 text-gray-400" : "bg-amber-600 text-white hover:cursor-pointer hover:bg-amber-500"} rounded px-2 py-1 text-xs font-semibold shadow transition-colors duration-300`}
          >
            {contestants.length < 2
              ? "Set up the contestants to start"
              : "Start the conversation"}
          </button>
        </div>
      </form>
    </div>
  );
}
