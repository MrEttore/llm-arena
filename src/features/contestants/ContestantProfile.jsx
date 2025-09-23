export default function ContestantProfile({ profile }) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold">{profile ? profile.name : "Contestant"}</p>
      <p className="text-xs italic">{profile ? profile.model : "[model]"}</p>
    </div>
  );
}
