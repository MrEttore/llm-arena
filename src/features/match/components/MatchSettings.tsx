import { CancelButton, ResetButton, StartButton } from "@/ui/buttons";

import { useMatchControl } from "../hooks/useMatchControl";

export default function MatchSettings() {
  const {
    fields: { startingContestant, numberOfExchanges, iceBreaker },
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
  } = useMatchControl();

  return (
    <div className="flex min-h-0 flex-1 flex-col space-y-2 rounded-xl border-1 border-white/20 bg-linear-to-br from-white/15 to-white/10 p-2 font-medium shadow-2xl backdrop-blur-lg">
      <h3 className={`flex items-center justify-center gap-1 text-white`}>Match Settings</h3>
      <form
        className="flex min-h-0 flex-1 flex-col space-y-2 overflow-hidden"
        onSubmit={handleStart}
      >
        <div className="flex-1 space-y-2 overflow-y-auto">
          <div className="flex items-center justify-between">
            <label
              htmlFor="number-of-exchanges"
              className="pl-1 text-xs font-medium tracking-wider text-white/60"
            >
              Number of Exchanges
            </label>
            <input
              type="text"
              id="number-of-exchanges"
              value={numberOfExchanges}
              onChange={(e) => handleNumberOfExchangesChange(e.target.value)}
              className={`w-15 rounded-lg border-1 border-white/10 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic hover:border-white/30 focus:border-white/40 focus:outline-none sm:text-xs`}
              placeholder="e.g., 5"
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="pl-1 text-xs font-medium tracking-wider text-white/60">
              Who starts?
            </label>
            <div
              role="group"
              aria-label="starting-contestant"
              className="flex min-w-15 items-center justify-around overflow-hidden rounded-lg border-1 border-white/10"
            >
              {contestants.length ? (
                contestants.map((contestant) => (
                  <button
                    type="button"
                    key={contestant.id}
                    onClick={() => handleStartingContestantChange(contestant)}
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
            <label
              htmlFor="ice-breaker"
              className="pl-1 text-xs font-medium tracking-wider text-white/60"
            >
              {startingContestant ? `${startingContestant.name}'s ice breaker` : "Ice Breaker"}
            </label>
            <textarea
              id="ice-breaker"
              rows={2}
              value={iceBreaker}
              onChange={(e) => handleIceBreakerChange(e.target.value)}
              className={`flex-1 resize-none rounded-lg border-1 border-white/10 px-2 py-1 transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic hover:border-white/30 focus:border-white/40 focus:outline-none sm:text-xs dark:text-gray-200`}
              placeholder="e.g., Debate: Is pineapple on pizza acceptable?"
            />
          </div>
        </div>
        <div className="mt-auto flex items-end justify-end gap-2 border-t-1 border-white/20 pt-2">
          <ResetButton onReset={handleReset} />
          {matchStatus !== "running" ? (
            <StartButton
              isReadyToStart={isReadyToStart}
              isConversationCanceled={matchStatus === "canceled"}
            />
          ) : (
            <CancelButton onCancel={handleCancel} />
          )}
        </div>
      </form>
    </div>
  );
}
