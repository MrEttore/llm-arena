import { useState } from "react";
import { useSelector } from "react-redux";
import { getContestant1, getContestant2 } from "../../redux/slices/matchSlice";

export default function MatchStarter() {
  const [startsMatch, setStartsMatch] = useState("1");

  const contestant1 = useSelector(getContestant1);
  const contestant2 = useSelector(getContestant2);

  return (
    <div className="space-y-2 px-1 py-0.5">
      <h3 className="font-semibold">Who starts the match?</h3>
      <form>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className={`rounded px-1 py-0.5 transition-all duration-300 hover:cursor-pointer ${startsMatch === "1" ? "ring-1 ring-amber-600" : "ring-2 ring-gray-900"}`}
            onClick={() => setStartsMatch("1")}
          >
            {contestant1 ? contestant1.name : "Contestant 1"}
          </button>
          <button
            type="button"
            className={`rounded px-1 py-0.5 transition-all duration-300 hover:cursor-pointer ${startsMatch === "2" ? "ring-1 ring-amber-600" : "ring-2 ring-gray-900"}`}
            onClick={() => setStartsMatch("2")}
          >
            {contestant2 ? contestant2.name : "Contestant 2"}
          </button>
        </div>
        <div>
          <textarea
            id="first-message"
            rows={3}
            //   value={name}
            //   onChange={(e) => setName(e.target.value)}
            className="mt-4 w-full resize-none rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
            placeholder={`${startsMatch === "1" ? (contestant1 ? contestant1.name : "Contestant 1") : contestant2 ? contestant2.name : "Contestant 2"}'s ice breaker...`}
          />
        </div>
      </form>
    </div>
  );
}
