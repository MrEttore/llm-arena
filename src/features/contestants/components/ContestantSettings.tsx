import { Check } from "lucide-react";
import { CircleX } from "lucide-react";

import { PRESETS } from "@/data/presets";
import { useContestantForm } from "@/features/contestants/hooks/useContestantForm";
import { AddButton, ClearButton, LoadPresentsButton } from "@/ui/buttons";

type Props = { contestantNumber: number };

export default function ContestantSettings({ contestantNumber }: Props) {
  const {
    fields: { name, model, personality },
    contestantId,
    error,
    handleNameChange,
    handleModelChange,
    handlePersonalityChange,
    handleLoadPreset,
    handleSubmit,
    handleClear,
  } = useContestantForm(contestantNumber);

  return (
    <div className="min-h-0 space-y-2">
      <h3 className={`flex items-center gap-2 text-sm font-semibold tracking-wide text-white`}>
        {contestantId ? <Check className="text-green-500" size={16} strokeWidth={2.5} /> : null}
        {/* Character */}
        Contestant
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="pl-1 text-xs font-medium tracking-wider text-white/60">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="rounded-lg border-1 border-white/10 bg-white/5 px-2 py-1 text-xs text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none"
              placeholder={`e.g., ${PRESETS[contestantNumber].name}`}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="model"
              className="pl-1 text-xs font-medium tracking-wider text-white/60"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => handleModelChange(e.target.value)}
              className="rounded-lg border-1 border-white/10 bg-white/5 px-2 py-1 text-xs text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none"
              placeholder={`e.g., ${PRESETS[contestantNumber].model}`}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-1.5">
            <label
              htmlFor="personality"
              className="pl-1 text-xs font-medium tracking-wider text-white/60"
            >
              Personality
            </label>
            <textarea
              id="personality"
              rows={2}
              value={personality}
              onChange={(e) => handlePersonalityChange(e.target.value)}
              className="resize-none rounded-lg border-1 border-white/10 bg-white/5 px-2 py-1 text-xs text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none"
              placeholder={`e.g., ${PRESETS[contestantNumber].systemPrompt}`}
            />
          </div>
        </div>

        <div className={`mt-2 flex ${error ? "justify-between" : "justify-end"}`}>
          {error && (
            <p className="flex items-center gap-0.5 rounded-lg border-1 border-orange-700/30 bg-orange-700/15 px-2 py-1 text-xs font-semibold text-orange-700 shadow-md">
              <CircleX size={12} />
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <ClearButton onClear={handleClear} />
            <div className="flex gap-2 border-l-1 border-white/20 pl-2">
              <LoadPresentsButton onLoad={handleLoadPreset} />
              <AddButton contestantId={contestantId} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
