import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getContestantA, getContestantB } from '../../redux/slices/matchSlice';

export default function MatchStarter() {
  const [startsMatch, setStartsMatch] = useState('A');

  const contestantA = useSelector(getContestantA);
  const contestantB = useSelector(getContestantB);

  return (
    <div className="flex gap-4">
      <h3>Who starts the match?</h3>
      <div className="flex gap-2 items-center">
        <button
          className={`px-1 py-0.5 rounded transition-all duration-300 hover:cursor-pointer ${startsMatch === 'A' ? 'ring-2 ring-amber-600' : 'ring-2 ring-gray-900'}`}
          onClick={() => setStartsMatch('A')}
        >
          {contestantA ? contestantA.name : 'Contestant A'}
        </button>
        <button
          className={`px-1 py-0.5 rounded transition-all duration-300 hover:cursor-pointer ${startsMatch === 'B' ? 'ring-2 ring-amber-600' : 'ring-2 ring-gray-900'}`}
          onClick={() => setStartsMatch('B')}
        >
          {contestantB ? contestantB.name : 'Contestant B'}
        </button>
        <input
          type="text"
          id="first-message"
          //   value={name}
          //   onChange={(e) => setName(e.target.value)}
          className="px-2 py-1 block rounded-sm border-gray-300 shadow-sm sm:text-xs dark:bg-gray-900 dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-amber-300 transition-all duration-200 placeholder:italic"
          placeholder="First message"
        />
      </div>
    </div>
  );
}
