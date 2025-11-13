export default function AppFooter() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur-2xl">
      <div className="flex w-full flex-col items-center justify-between gap-3 px-3 py-3 text-xs text-white/60 sm:flex-row sm:gap-4 sm:px-4 lg:px-6">
        <p className="text-center text-[11px] sm:text-left sm:text-xs md:text-sm">
          © {new Date().getFullYear()} Dialectiq • Exploring machine reasoning through conversation
        </p>
        <div className="flex items-center gap-3 text-[11px] sm:text-xs md:text-sm">
          <a
            href="https://github.com/MrEttore/llm-arena"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          {/* <a href="#" className="transition-colors hover:text-white">
            License
          </a>
          <a href="#" className="transition-colors hover:text-white">
            Privacy
          </a> */}
        </div>
      </div>
    </footer>
  );
}
