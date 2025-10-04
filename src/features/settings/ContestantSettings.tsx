import { Check } from "lucide-react";
import type { FormEvent} from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { createContestant } from "../../domain/models";
import { addContestant, clearContestant, updateContestant } from "../../redux/slices/matchSlice";
import type { AppDispatch } from "../../redux/store";

export default function ContestantSettings() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("gpt-4.1-mini");
  const [personality, setPersonality] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [contestantId, setContestantId] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!name || !model || !personality) {
      setError("All fields are required!");
      return;
    }

    if (!contestantId) {
      const contestant = createContestant(name, model, personality);
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
      }),
    );
  };

  const handleClear = () => {
    if (!contestantId) return;
    setName("");
    setModel("");
    setPersonality("");
    setError(null);
    dispatch(clearContestant(contestantId));
    setContestantId(null);
  };

  return (
    <div className="space-y-1 p-1">
      <h3 className="flex items-center gap-1 font-semibold">
        Contestant
        {contestantId ? <Check className="text-amber-600" size={18} /> : null}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="contestantA-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`rounded px-2 py-1 ring-1 transition-all duration-200 placeholder:italic focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "ring-amber-600/50" : "ring-gray-100"}`}
            placeholder="Name"
          />
          <input
            type="text"
            id="contestantA-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`rounded px-2 py-1 ring-1 transition-all duration-200 placeholder:italic focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "ring-amber-600/50" : "ring-gray-100"}`}
            placeholder="Model"
          />
          <textarea
            id="contestantA-system-prompt"
            rows={2}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className={`col-span-2 resize-none rounded px-2 py-1 ring-1 transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "ring-amber-600/50" : "ring-gray-100"}`}
            placeholder="Personality"
          />
        </div>
        <div className={`mt-2 flex ${error ? "justify-between" : "justify-end"}`}>
          {error && (
            <p className="rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white">{error}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="rounded px-2 py-1 text-xs font-semibold shadow-sm ring-1 ring-gray-300 transition-colors duration-300 hover:cursor-pointer hover:bg-gray-100"
            >
              Clear
            </button>
            <button
              type="submit"
              className={`rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white shadow-sm transition-colors duration-300 hover:cursor-pointer hover:bg-amber-700`}
            >
              {!contestantId ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
