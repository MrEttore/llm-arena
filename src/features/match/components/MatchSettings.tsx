import { MatchControls } from "@/features/match/components";
import { useMatchSettings } from "@/features/match/hooks";

export default function MatchSettings() {
  const {
    fields: { startingAgent, numberOfExchanges, iceBreaker },
    setters: { setStartingAgent, setNumberOfExchanges, setIceBreaker },
    matchStatus,
    isReadyToStart,
    agents,
    handleStart,
    handleCancel,
    handleReset,
  } = useMatchSettings();

  return (
    <div className="flex flex-1 flex-col gap-4 rounded-xl border border-white/10 bg-white/10 p-3 font-medium shadow-sm backdrop-blur sm:p-4 lg:gap-6 lg:p-5">
      <form className="flex flex-1 flex-col gap-4" onSubmit={handleStart}>
        <div className="flex-1">
          <div className="grid h-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            <div className="flex flex-col gap-2 sm:justify-between sm:gap-3">
              <label
                htmlFor="number-of-exchanges"
                className="pl-1 text-xs font-medium tracking-wider text-white/60 sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
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
                className="w-18 rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
                placeholder="e.g., 5"
              />
            </div>

            <div className="flex flex-col gap-2 sm:justify-between sm:gap-3">
              <label className="pl-1 font-medium tracking-wider text-white/60 lg:text-xs 2xl:text-base">
                Who starts?
              </label>
              <div
                role="group"
                aria-label="starting-agent"
                className="flex w-fit items-center justify-between overflow-hidden rounded-xl border-1 border-white/10 bg-white/5"
              >
                {agents.length ? (
                  agents.map((agent) => (
                    <button
                      type="button"
                      key={agent.id}
                      onClick={() => setStartingAgent(agent)}
                      className={`cursor-pointer px-3 py-2 text-sm text-white transition-colors duration-300 sm:text-base lg:text-sm 2xl:text-base ${
                        startingAgent?.id === agent.id ? "bg-white/15" : "hover:bg-white/5"
                      }`}
                    >
                      {agent.name}
                    </button>
                  ))
                ) : (
                  <>
                    <p className="px-3 py-2 text-sm text-white sm:text-base lg:text-sm 2xl:text-base">
                      ?
                    </p>
                    <p className="px-3 py-2 text-sm text-white sm:text-base lg:text-sm 2xl:text-base">
                      ?
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="col-span-1 flex flex-col gap-2 sm:col-span-2">
              <label
                htmlFor="ice-breaker"
                className="pl-1 text-xs font-medium tracking-wider text-white/60 sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
              >
                {startingAgent ? `${startingAgent.name}'s ice breaker` : "Ice Breaker"}
              </label>
              <textarea
                id="ice-breaker"
                rows={3}
                value={iceBreaker}
                onChange={(e) => setIceBreaker(e.target.value)}
                className="min-h-[120px] resize-none rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
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
