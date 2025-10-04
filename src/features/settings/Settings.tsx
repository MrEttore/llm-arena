import ContestantSettings from "./ContestantSettings";
import MatchSettings from "./MatchSettings";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-2 divide-y-1 divide-gray-200 px-4 py-4">
      <div className="pb-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <ContestantSettings key={i} />
        ))}
      </div>
      <MatchSettings />
    </div>
  );
}
