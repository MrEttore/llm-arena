import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setContestantA, setContestantB } from '../../redux/slices/matchSlice';
import { createContestant } from '../../domain/models';

export default function ContestantSettings({ contestantNumber }) {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [personality, setPersonality] = useState('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !model || !personality) {
      setError('All fields are required!');
      return;
    }

    const contestant = createContestant(name, model, personality);

    if (contestantNumber === 'A') dispatch(setContestantA(contestant));
    if (contestantNumber === 'B') dispatch(setContestantB(contestant));
    setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex">
        <h3 className="font-semibold">Contestant {contestantNumber}</h3>
        <div className="flex flex-1 items-center justify-around">
          <input
            type="text"
            id="contestantA-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-2 py-1 block rounded-sm border-gray-300 shadow-sm sm:text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder:italic"
            placeholder="Name"
          />
          <input
            type="text"
            id="contestantA-model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="px-2 py-1 block rounded-sm border-gray-300 shadow-sm sm:text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder:italic"
            placeholder="Model"
          />
        </div>
      </div>
      <div className="space-y-1">
        <textarea
          id="contestantA-system-prompt"
          rows={2}
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="px-2 w-full py-1 block rounded-sm border-gray-300 shadow-sm sm:text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder:italic resize-none"
          placeholder="Personality"
        />
      </div>
      <div className={`flex ${error ? 'justify-between' : 'justify-end'}`}>
        {error && (
          <p className="text-xs px-2 py-1 rounded bg-red-600 text-white">
            {error}
          </p>
        )}
        <button
          type="submit"
          className="hover:cursor-pointer text-xs px-2 py-1 rounded bg-amber-600 text-white font-semibold shadow hover:bg-amber-700 transition-colors duration-300"
        >
          Set
        </button>
      </div>
    </form>
  );
}
