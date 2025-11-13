import logo from "@/assets/logo.png";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 backdrop-blur-2xl">
      <div className="flex w-full max-w-screen-2xl items-center justify-between px-3 py-2 sm:px-4 lg:px-6">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16"
            draggable={false}
          />
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-white sm:text-xl lg:text-2xl">Dialectiq</h1>
            <p className="text-[11px] text-white/60 italic sm:text-xs lg:text-base">
              Watch AI minds meet and speak.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
