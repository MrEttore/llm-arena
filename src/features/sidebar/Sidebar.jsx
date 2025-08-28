export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-gray-200 dark:border-gray-800">
      <header className="p-4 font-semibold">Conversations</header>
      <nav className="flex-1 overflow-y-auto">{/* ...list items... */}</nav>
      <div className="p-4 text-sm text-gray-500">v0.1</div>
    </aside>
  );
}
