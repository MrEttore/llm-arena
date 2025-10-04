import { useSelector } from "react-redux";

import { getContestants } from "../../redux/slices/matchSlice";
import type { RootState } from "../../redux/store";
import ContestantProfile from "../contestants/ContestantProfile";

export default function ChatHeader() {
  const contestants = useSelector((state: RootState) => getContestants(state));
  return (
    <header className="pt-4 pb-2">
      <div className="grid grid-cols-2">
        {contestants.length === 2 &&
          contestants.map((contestant) => (
            <ContestantProfile profile={contestant} key={contestant.id} />
          ))}
      </div>
    </header>
  );
}
