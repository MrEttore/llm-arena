import type { Contestant } from "@/domain/types";

interface Props {
  profile?: Contestant;
}
export default function ContestantProfile({ profile }: Props) {
  return (
    <div className="flex flex-col items-center">
      <p className="font-semibold text-amber-600">{profile ? profile.name : "Contestant"}</p>
      <p className="text-xs italic">{profile ? profile.model : "[model]"}</p>
    </div>
  );
}
