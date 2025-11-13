import { ContestantSettings } from "@/features/contestants/components";
import { MatchSettings } from "@/features/match/components";

export default function Settings() {
  return (
    <div className="space-y-4 overflow-y-auto border-b border-white/10 pb-4 lg:gap-5 lg:border-r lg:border-b-0 lg:pr-4 lg:pb-0 xl:pr-6 2xl:gap-6">
      <div className="space-y-3 font-medium sm:space-y-4">
        {Array.from({ length: 2 }).map((_, i) => (
          <ContestantSettings key={i} contestantNumber={i} />
        ))}
      </div>
      <MatchSettings />
    </div>
  );
}
