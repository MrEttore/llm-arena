import logo from "@/assets/logo.png";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-2 py-1">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="h-15 w-15" draggable={false} />
          <div className="flex flex-col">
            <h1 className="text-xl font-semibold text-white">Dialectiq</h1>
            <p className="text-xs text-white/60 italic">Watch AI minds meet and speak.</p>
          </div>
        </div>
      </div>
    </header>
  );
}
