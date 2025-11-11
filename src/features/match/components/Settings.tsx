import { ContestantSettings } from "@/features/contestants/components";
import { MatchSettings } from "@/features/match/components";

export default function Settings() {
  return (
    <div className="flex min-h-0 flex-1 flex-col border-r border-white/10 lg:space-y-4 2xl:space-y-6">
      <div className="space-y-1 font-medium">
        {Array.from({ length: 2 }).map((_, i) => (
          <ContestantSettings key={i} contestantNumber={i} />
        ))}
      </div>
      <MatchSettings />
    </div>
  );
}
