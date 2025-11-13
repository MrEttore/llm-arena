import { CircleX, LoaderCircle } from "lucide-react";

import placeholderAvatar from "@/assets/placeholder-avatar.svg";
import { PRESETS } from "@/data/presets";
import { useContestantForm } from "@/features/contestants/hooks";
import { AddButton, ClearButton, GenAvatarButton, LoadPresentsButton } from "@/ui/buttons";

type Props = { contestantNumber: number };

export default function ContestantSettings({ contestantNumber }: Props) {
  const {
    fields: { name, model, personality, avatarUrl, isLoadingImage },
    setters: { setName, setModel, setPersonality, setIsLoadingImage },
    error,
    existing,
    handleLoadPreset,
    handleGenerateAvatar,
    handleSubmit,
    handleClear,
  } = useContestantForm(contestantNumber);

  return (
    <div className="min-h-0 rounded-xl border border-white/10 bg-white/10 p-3 shadow-sm backdrop-blur sm:p-4 lg:space-y-4 2xl:space-y-6">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="flex flex-row justify-center lg:justify-start">
            <div className="relative h-14 w-14 lg:h-18 lg:w-18">
              {isLoadingImage && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full border border-white/10 bg-white/10 shadow-sm">
                  <LoaderCircle className="h-5 w-5 animate-spin text-white/60" />
                </div>
              )}
              <img
                className={`absolute inset-0 rounded-full border border-white/10 object-cover shadow-sm transition-opacity duration-300 ${isLoadingImage ? "opacity-0" : "opacity-100"}`}
                src={avatarUrl || placeholderAvatar}
                alt={`Contestant ${contestantNumber}'s avatar`}
                onLoad={() => setIsLoadingImage(false)}
                onError={(e) => {
                  e.currentTarget.src = "./placeholder-avatar.svg";
                  setIsLoadingImage(false);
                }}
              />
            </div>
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
              placeholder={`e.g., ${PRESETS[contestantNumber].name}`}
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
              placeholder={`e.g., ${PRESETS[contestantNumber].model}`}
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
              placeholder={`e.g., ${PRESETS[contestantNumber].systemPrompt}`}
            />
          </div>
        </div>

        <div
          className={`flex items-center justify-between gap-2 pt-1 sm:justify-end ${error ? "justify-start" : "justify-end"}`}
        >
          {error && (
            <p className="flex items-center gap-0.5 rounded-lg border-1 border-orange-700/30 bg-orange-700/15 px-2 py-1 text-xs font-semibold text-orange-700 shadow-md">
              <CircleX size={12} />
              {error}
            </p>
          )}
          <div className="flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
            <ClearButton onClear={handleClear} />
            <div className="flex border-l-1 border-white/10">
              <GenAvatarButton
                disabled={!personality ? true : false}
                onClick={handleGenerateAvatar}
              />
              <LoadPresentsButton onLoad={handleLoadPreset} />
              <AddButton contestantId={existing?.id} />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
