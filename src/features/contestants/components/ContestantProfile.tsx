import type { Contestant } from "@/domain/types";

interface Props {
  profile?: Contestant;
}

export default function ContestantProfile({ profile }: Props) {
  return (
    <div className="flex flex-col items-center text-white">
      {profile ? (
        <>
          <p className="font-semibold">{profile.name}</p>
          <p className="text-xs italic opacity-50">{profile.model}</p>
        </>
      ) : (
        <p className="font-semibold opacity-50">?</p>
      )}
    </div>
  );
}
