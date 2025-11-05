import ContestantSettings from "../../contestants/components/ContestantSettings";
import MatchSettings from "./MatchSettings";

export default function Settings() {
  return (
    <div className="flex min-h-0 flex-1 flex-col divide-y-2 divide-white/10 lg:space-y-2 2xl:space-y-6">
      <div className="space-y-3 rounded-xl border-1 border-white/20 bg-linear-to-br from-white/15 to-white/10 p-2 pb-2 font-medium shadow-2xl backdrop-blur-lg">
        {Array.from({ length: 2 }).map((_, i) => (
          <ContestantSettings key={i} contestantNumber={i} />
        ))}
      </div>
      <MatchSettings />
    </div>
  );
}
