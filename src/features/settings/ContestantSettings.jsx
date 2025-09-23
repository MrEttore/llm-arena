import { useState } from "react";
import { useDispatch } from "react-redux";
import { Check } from "lucide-react";
import {
  addContestant,
  clearContestant,
  updateContestant,
} from "../../redux/slices/matchSlice";
import { createContestant } from "../../domain/models";

export default function ContestantSettings() {
  const [name, setName] = useState("");
  const [model, setModel] = useState("gpt-4.1-mini");
  const [personality, setPersonality] = useState("");
  const [error, setError] = useState(null);
  const [contestantId, setContestantId] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
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

    const updatedContestant = {
      id: contestantId,
      name,
      model,
      systemPrompt: personality,
    };

    dispatch(updateContestant(updatedContestant));
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
    <div className={`space-y-1 px-1 pb-2`}>
      <h3 className="flex items-center gap-1 font-semibold">
        Contestant{" "}
        {contestantId ? <Check className="text-amber-600" size={18} /> : null}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="contestantA-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "dark:bg-gray-900" : "dark:bg-gray-800"}`}
            placeholder="Name"
          />
          <input
            type="text"
            id="contestantA-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className={`rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "dark:bg-gray-900" : "dark:bg-gray-800"}`}
            placeholder="Model"
          />
          <textarea
            id="contestantA-system-prompt"
            rows={2}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className={`col-span-2 resize-none rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:text-gray-200 ${contestantId ? "dark:bg-gray-900" : "dark:bg-gray-800"}`}
            placeholder="Personality"
          />
        </div>
        <div
          className={`mt-2 flex ${error ? "justify-between" : "justify-end"}`}
        >
          {error && (
            <p className="rounded bg-red-600/50 px-2 py-1 text-xs text-white">
              {error}
            </p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleClear}
              className="rounded border-1 border-amber-600 px-2 py-1 text-xs font-semibold text-white shadow transition-colors duration-300 hover:cursor-pointer hover:bg-gray-800"
            >
              Clear
            </button>
            <button
              type="submit"
              className={`rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white shadow transition-colors duration-300 hover:cursor-pointer hover:bg-amber-500`}
            >
              {!contestantId ? "Add" : "Update"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
