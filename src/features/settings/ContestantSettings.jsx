import { useState } from "react";
import { useDispatch } from "react-redux";
import { setContestant, clearContestant } from "../../redux/slices/matchSlice";
import { createContestant } from "../../domain/models";

export default function ContestantSettings({ contestantId }) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");
  const [personality, setPersonality] = useState("");
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !model || !personality) {
      setError("All fields are required!");
      return;
    }

    const contestant = createContestant(contestantId, name, model, personality);
    dispatch(setContestant(contestant));
    setError(null);
  };

  const handleClear = () => {
    setName("");
    setModel("");
    setPersonality("");
    setError(null);
    dispatch(clearContestant(contestantId));
  };

  return (
    <div className="space-y-1 border-b-1 border-amber-600/20 px-1 pb-2">
      <h3 className="font-semibold">Contestant {contestantId}</h3>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="text"
            id="contestantA-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
            placeholder="Name"
          />
          <input
            type="text"
            id="contestantA-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
            placeholder="Model"
          />
          <textarea
            id="contestantA-system-prompt"
            rows={2}
            value={personality}
            onChange={(e) => setPersonality(e.target.value)}
            className="col-span-2 resize-none rounded border-gray-300 px-2 py-1 shadow-sm transition-all duration-200 placeholder:italic focus:ring-1 focus:ring-amber-600 focus:outline-none sm:text-xs dark:bg-gray-800 dark:text-gray-200"
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
              className="rounded bg-amber-600 px-2 py-1 text-xs font-semibold text-white shadow transition-colors duration-300 hover:cursor-pointer hover:bg-amber-500"
            >
              Set
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
