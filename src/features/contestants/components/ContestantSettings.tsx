import { Check } from "lucide-react";
import { CircleX, Plus, RotateCcw, Trash } from "lucide-react";
import type { FormEvent } from "react";
import { useState } from "react";

import { useAppDispatch } from "@/app/hooks";
import type { Contestant } from "@/domain/types";

import { addContestant, clearContestant, updateContestant } from "../slice";

type Props = {
  contestantNumber: number;
};

export default function ContestantSettings({ contestantNumber }: Props) {
  const [name, setName] = useState<string>("");
  const [model, setModel] = useState<string>("gpt-4.1-mini");
  const [personality, setPersonality] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [contestantId, setContestantId] = useState<string | null>(null);

  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !model || !personality) {
      setError("All fields are required!");
      return;
    }

    if (!contestantId) {
      const contestant: Contestant = {
        id: crypto.randomUUID(),
        name,
        model,
        systemPrompt: personality,
        messages: [],
      };
      dispatch(addContestant(contestant));
      setContestantId(contestant.id);
      setError(null);
      return;
    }

    dispatch(
      updateContestant({
        id: contestantId,
        name,
        model,
        systemPrompt: personality,
        messages: [],
      }),
    );
  };

  const handleClear = () => {
    if (contestantId) dispatch(clearContestant(contestantId));
    setName("");
    setModel("");
    setPersonality("");
    setError(null);
    setContestantId(null);
  };

  return (
    <div className="space-y-2 rounded-xl border-1 border-white/20 bg-linear-to-br from-white/15 to-white/10 p-2 font-medium shadow-2xl backdrop-blur-lg">
      <h3 className={`flex items-center justify-center gap-1 text-white`}>
        Contestant {contestantNumber + 1}
        {contestantId ? <Check className="text-green-600" size={18} /> : null}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`rounded-lg border-1 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic focus:border-white/40 focus:outline-none sm:text-xs ${contestantId ? "border-white/40" : "border-white/10"}`}
            placeholder="Name"
          />
          <input
            type="text"
            id="model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`rounded-lg border-1 px-2 py-1 text-white transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic focus:border-white/40 focus:outline-none sm:text-xs ${contestantId ? "border-white/40" : "border-white/10"}`}
            placeholder="Model"
          />
          <textarea
            id="personality"
            rows={2}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className={`col-span-2 resize-none rounded-lg border-1 px-2 py-1 transition-colors duration-300 placeholder:font-light placeholder:text-white/30 placeholder:italic focus:border-white/40 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "border-white/40" : "border-white/10"}`}
            placeholder="Personality"
          />
        </div>

        <div className={`mt-2 flex ${error ? "justify-between" : "justify-end"}`}>
          {error && (
            <p className="flex items-center gap-0.5 rounded-lg border-1 border-red-600/80 bg-white/5 px-2 py-1 text-xs font-semibold text-red-600/80 shadow-md">
              <CircleX size={12} />
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-0.5 rounded-lg border-1 border-white/30 bg-white/5 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80"
            >
              <Trash size={12} />
              Clear
            </button>
            <button
              type="submit"
              className={`flex items-center gap-0.5 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80`}
            >
              {!contestantId ? (
                <Plus size={12} strokeWidth={2} />
              ) : (
                <RotateCcw size={12} strokeWidth={2} />
              )}
              {!contestantId ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
