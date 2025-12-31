type Props = {
  children: React.ReactNode;
};

export default function AgentControls({ children }: Props) {
  return (
    <div className="flex flex-col gap-2 pt-1 sm:justify-end">
      <div className="ml-auto flex overflow-hidden rounded-xl border border-white/10 bg-white/5">
        {children}
      </div>
    </div>
  );
}
