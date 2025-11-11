import { MatchControls } from "@/features/match/components";
import { useMatchSettings } from "@/features/match/hooks";

export default function MatchSettings() {
  const {
    fields: { startingContestant, numberOfExchanges, iceBreaker },
    setters: { setStartingContestant, setNumberOfExchanges, setIceBreaker },
    matchStatus,
    isReadyToStart,
    contestants,
    handleStart,
    handleCancel,
    handleReset,
  } = useMatchSettings();

  return (
    <div className="flex min-h-0 flex-1 flex-col p-1 font-medium">
      <form className="flex min-h-0 flex-1 flex-col" onSubmit={handleStart}>
        <div className="flex min-h-0 space-y-2 overflow-hidden">
          <div className="grid flex-1 grid-cols-2 gap-1.5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <label
                htmlFor="number-of-exchanges"
                className="pl-1 font-medium tracking-wider text-white/60 lg:text-xs 2xl:text-base"
              >
                Number of Exchanges
              </label>
              <input
                type="text"
                id="number-of-exchanges"
                inputMode="numeric"
                pattern="[0-9]*"
                value={numberOfExchanges}
                onChange={(e) => setNumberOfExchanges(e.target.value)}
                className="w-15 rounded border-1 border-white/10 bg-white/5 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none lg:text-xs 2xl:text-base"
                placeholder="e.g., 5"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="pl-1 font-medium tracking-wider text-white/60 lg:text-xs 2xl:text-base">
                Who starts?
              </label>
              <div
                role="group"
                aria-label="starting-contestant"
                className="flex min-w-15 items-center justify-around overflow-hidden rounded border-1 border-white/10 bg-white/5"
              >
                {contestants.length ? (
                  contestants.map((contestant) => (
                    <button
                      type="button"
                      key={contestant.id}
                      onClick={() => setStartingContestant(contestant)}
                      className={`cursor-pointer px-2 py-1 text-white transition-colors duration-300 lg:text-xs 2xl:text-base ${startingContestant?.id === contestant.id ? "bg-white/15" : "hover:bg-white/5"}`}
                    >
                      {contestant.name}
                    </button>
                  ))
                ) : (
                  <>
                    <p className="px-2 py-1 text-white lg:text-xs 2xl:text-base">?</p>
                    <p className="px-2 py-1 text-white lg:text-xs 2xl:text-base">?</p>
                  </>
                )}
              </div>
            </div>

            <div className="col-span-2 flex flex-col space-y-2">
              <label
                htmlFor="ice-breaker"
                className="pl-1 font-medium tracking-wider text-white/60 lg:text-xs 2xl:text-base"
              >
                {startingContestant ? `${startingContestant.name}'s ice breaker` : "Ice Breaker"}
              </label>
              <textarea
                id="ice-breaker"
                rows={3}
                value={iceBreaker}
                onChange={(e) => setIceBreaker(e.target.value)}
                className="resize-none rounded border-1 border-white/10 bg-white/5 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none lg:text-xs 2xl:text-base"
                placeholder="e.g., Debate: Is pineapple on pizza acceptable?"
              />
            </div>
          </div>
        </div>
        <MatchControls
          matchStatus={matchStatus}
          isReadyToStart={isReadyToStart}
          onCancel={handleCancel}
          onReset={handleReset}
        />
      </form>
    </div>
  );
}
