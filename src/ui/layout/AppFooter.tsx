export default function AppFooter() {
  return (
    <footer className="border-t border-white/10 bg-white/5 backdrop-blur">
      <div className="mx-auto flex flex-col items-center justify-between gap-4 px-2 py-2 text-xs text-white/60 sm:flex-row">
        <p>
          © {new Date().getFullYear()} Dialectiq • Exploring machine reasoning through conversation
        </p>
        <div className="flex">
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
