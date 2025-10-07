import { useAppSelector } from "@/app/hooks";
import type { Contestant } from "@/domain/types";
import { getContestants } from "@/features/contestants/slice";

import ContestantProfile from "../../contestants/components/ContestantProfile";

export default function ChatHeader() {
  const contestants = useAppSelector((state) => getContestants(state));
  return (
    <header className="pt-4 pb-2">
      <div className="grid grid-cols-2">
        {contestants.length === 2 &&
          contestants.map((contestant: Contestant) => (
            <ContestantProfile profile={contestant} key={contestant.id} />
          ))}
      </div>
    </header>
  );
}
