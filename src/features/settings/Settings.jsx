import ContestantSettings from "./ContestantSettings";
import MatchSettings from "./MatchSettings";

export default function Settings() {
  return (
    <div className="flex flex-col space-y-2 px-4 py-4">
      {Array.from({ length: 2 }).map((_, i) => (
        <ContestantSettings key={i} />
      ))}
      <MatchSettings />
    </div>
  );
}
