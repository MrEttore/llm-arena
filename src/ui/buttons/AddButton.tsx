import { Plus, RefreshCcw } from "lucide-react";

type Props = {
  contestantId: string | null;
};

export default function AddButton({ contestantId }: Props) {
  return (
    <button
      type="submit"
      className="flex items-center gap-1 rounded-lg border-1 border-transparent px-2 py-1 font-semibold tracking-wider text-white transition-all duration-300 hover:cursor-pointer hover:border-white/5 hover:bg-white/5 hover:shadow-xs active:scale-[98%] lg:text-xs 2xl:text-sm"
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
