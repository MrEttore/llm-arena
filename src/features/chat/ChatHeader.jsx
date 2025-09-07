import { Swords } from "lucide-react";
import Contestant from "../contestants/Contestant";
import { useSelector } from "react-redux";
import { getContestant1, getContestant2 } from "../../redux/slices/matchSlice";

export default function ChatHeader() {
  const contestant1 = useSelector(getContestant1);
  const contestant2 = useSelector(getContestant2);

  return (
    <header className="border-b border-gray-800 bg-white/80 pt-4 pb-2 dark:bg-gray-950/80">
      <div className="grid grid-cols-3">
        <Contestant info={contestant1} />
        <div className="flex items-center justify-center">
          <Swords className="text-amber-600" />
        </div>

        <Contestant info={contestant2} />
      </div>
    </header>
  );
}
