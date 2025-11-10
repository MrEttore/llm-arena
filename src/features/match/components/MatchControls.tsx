import type { MouseEvent } from "react";

import { CancelButton, ResetButton, StartButton } from "@/ui/buttons";

type Props = {
  matchStatus: "idle" | "running" | "error" | "canceled" | "completed";
  isReadyToStart: boolean;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  onReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function MatchControls({ matchStatus, isReadyToStart, onCancel, onReset }: Props) {
  const canStart = matchStatus === "idle" && isReadyToStart;
  const canCancel = matchStatus === "running";
  const canReset = matchStatus !== "idle";

  return (
    <div className="mt-auto flex items-end justify-end gap-2 pt-2">
      {canReset && <ResetButton onClick={onReset} />}
      {canCancel ? <CancelButton onClick={onCancel} /> : <StartButton disabled={!canStart} />}
    </div>
  );
}
