import { Plus, RefreshCcw } from "lucide-react";

type Props = {
  contestantId: string | null;
};

export default function AddButton({ contestantId }: Props) {
  return (
    <button
      type="submit"
      className="flex items-center gap-1 px-2 py-1 font-semibold tracking-wide text-white transition-all duration-300 hover:cursor-pointer hover:bg-white/5 hover:shadow-xs active:scale-[98%] lg:text-xs 2xl:text-sm"
    >
      {!contestantId ? (
        <Plus size={12} strokeWidth={2} />
      ) : (
        <RefreshCcw size={12} strokeWidth={2} />
      )}
      {!contestantId ? "Add" : "Update"}
    </button>
  );
}
