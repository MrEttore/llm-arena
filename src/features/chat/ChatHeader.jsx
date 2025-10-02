import ContestantProfile from "../contestants/ContestantProfile";
import { useSelector } from "react-redux";
import { getContestants } from "../../redux/slices/matchSlice";

export default function ChatHeader() {
  const contestants = useSelector(getContestants);
  console.log(contestants);

  return (
    <header className="pt-4 pb-2">
      <div className="grid grid-cols-2">
        {contestants.length === 2 &&
          contestants.map((contestant) => (
            <ContestantProfile profile={contestant} />
          ))}
      </div>
    </header>
  );
}
