import ContestantSettings from "../../contestants/components/ContestantSettings";
import MatchSettings from "./MatchSettings";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-2 divide-y-2 divide-white/10 p-2">
      <div className="space-y-3 pb-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <ContestantSettings key={i} contestantNumber={i} />
        ))}
      </div>
      <MatchSettings />
    </div>
  );
}
