import type { MouseEvent } from "react";

import { CancelButton, ResetButton, StartButton } from "@/ui/buttons";

type Props = {
  sessionStatus: "idle" | "running" | "error" | "canceled" | "completed";
  isReadyToStart: boolean;
  onCancel: (e: MouseEvent<HTMLButtonElement>) => void;
  onReset: (e: MouseEvent<HTMLButtonElement>) => void;
};

export default function SessionControls({
  sessionStatus,
  isReadyToStart,
  onCancel,
  onReset,
}: Props) {
  const canStart = sessionStatus === "idle" && isReadyToStart;
  const canCancel = sessionStatus === "running";
  const canReset = sessionStatus !== "idle";

  return (
    <div className="mt-auto flex flex-wrap items-end justify-end gap-2 pt-2">
      {canReset && <ResetButton onClick={onReset} />}
      {canCancel ? <CancelButton onClick={onCancel} /> : <StartButton disabled={!canStart} />}
    </div>
  );
}
