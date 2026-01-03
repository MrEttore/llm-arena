import { Ban, X } from "lucide-react";

import { PRESETS } from "@/data/presets";
import { AgentAvatar, AgentControls } from "@/features/agents/components";
import { useAgentSettings } from "@/features/agents/hooks";
import { AddAgentButton, ClearButton, GenAgentAvatarButton, LoadPresetsButton } from "@/ui/buttons";

type Props = { agentIndex: number };

export default function AgentSettings({ agentIndex }: Props) {
  const {
    fields: { name, model, personality, avatar },
    setters: { setName, setModel, setPersonality },
    error,
    existing,
    isGeneratingAvatar,
    canSubmit,
    canGenerateAvatar,
    canUpdate,
    handleLoadPreset,
    handleGenerateAvatar,
    handleSubmit,
    handleClear,
    handleClearError,
  } = useAgentSettings(agentIndex);

  return (
    <div className="min-h-0 rounded-xl border border-white/10 bg-white/10 p-3 shadow-sm backdrop-blur sm:p-4 lg:space-y-4 2xl:space-y-6">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-row justify-center lg:justify-start">
            <AgentAvatar src={avatar} isBusy={isGeneratingAvatar} />
          </div>

          <div className="flex flex-col gap-1.5 sm:ml-3">
            <label
              htmlFor="name"
              className="pl-1 text-xs font-medium tracking-wider text-white/60 sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
              placeholder={`e.g., ${PRESETS[agentIndex].name}`}
            />
          </div>

          <div className="flex flex-col gap-1.5 lg:ml-3">
            <label
              htmlFor="model"
              className="pl-1 text-xs font-medium tracking-wider text-white/60 sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
              placeholder={`e.g., ${PRESETS[agentIndex].model}`}
            />
          </div>

          <div className="col-span-1 flex flex-col gap-1.5 sm:col-span-2 lg:col-span-3">
            <label
              htmlFor="personality"
              className="pl-1 text-xs font-medium tracking-wider text-white/60 sm:text-sm lg:text-xs xl:text-sm 2xl:text-base"
            >
              Personality
            </label>
            <textarea
              id="personality"
              rows={2}
              value={personality}
              onChange={(e) => setPersonality(e.target.value)}
              className="min-h-[96px] resize-none rounded-xl border-1 border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/40 placeholder:italic hover:border-white/20 focus:border-white/50 focus:bg-white/10 focus:outline-none sm:text-base lg:text-sm 2xl:text-base"
              placeholder={`e.g., ${PRESETS[agentIndex].systemPrompt}`}
            />
          </div>
        </div>

        <AgentControls>
          <ClearButton onClick={handleClear} />
          <div className="flex border-l-1 border-white/10">
            <GenAgentAvatarButton disabled={!canGenerateAvatar} onClick={handleGenerateAvatar} />
            <LoadPresetsButton onClick={handleLoadPreset} />

            <AddAgentButton
              isUpdate={Boolean(existing)}
              disabled={existing ? !canUpdate : !canSubmit}
            />
          </div>

          {error && (
            <div className="ml-auto flex items-center gap-1 rounded-xl border-1 border-white/10 bg-orange-700/10 px-2 py-1 text-xs font-semibold text-orange-700">
              <Ban size={14} />
              {error}
              <button
                type="button"
                className="rounded-full bg-orange-700/20 p-0.5 text-xs font-normal transition-colors duration-300 hover:cursor-pointer hover:bg-orange-700/40"
                onClick={handleClearError}
              >
                <X size={14} />
              </button>
            </div>
          )}
        </AgentControls>
      </form>
    </div>
  );
}
