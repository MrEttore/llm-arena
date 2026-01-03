import { Plus, RefreshCcw } from "lucide-react";

type Props = {
  disabled?: boolean;
  isUpdate?: boolean;
};

export default function AddAgentButton({ disabled = true, isUpdate = false }: Props) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`flex items-center gap-1 px-2 py-1 font-semibold tracking-wide text-white transition-all duration-300 lg:text-sm 2xl:text-base ${
        disabled
          ? "opacity-50 hover:cursor-not-allowed hover:opacity-50"
          : "hover:cursor-pointer hover:bg-white/5 hover:shadow-xs active:scale-[98%]"
      }`}
    >
      {isUpdate ? (
        <>
          <RefreshCcw size={12} strokeWidth={2} /> Update
        </>
      ) : (
        <>
          <Plus size={12} strokeWidth={2} /> Add
        </>
      )}
    </button>
  );
}
