import { Plus, RefreshCcw } from "lucide-react";

type Props = {
  contestantId: string | null;
};

function AddButton({ contestantId }: Props) {
  return (
    <button
      type="submit"
      // className="flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80 active:scale-[98%]"
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

export default AddButton;
