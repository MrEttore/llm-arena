import { Plus, RotateCcw } from "lucide-react";

type Props = {
  contestantId: string | null;
};

function AddButton({ contestantId }: Props) {
  return (
    <button
      type="submit"
      className={`flex items-center gap-1 rounded-lg border-1 border-white/30 bg-white/15 px-2 py-1 text-xs font-semibold text-white shadow-md transition-all duration-300 hover:cursor-pointer hover:opacity-80 active:scale-[98%]`}
    >
      {!contestantId ? <Plus size={12} strokeWidth={2} /> : <RotateCcw size={12} strokeWidth={2} />}
      {!contestantId ? "Add" : "Update"}
    </button>
  );
}

export default AddButton;
