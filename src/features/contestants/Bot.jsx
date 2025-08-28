export default function Bot({ children }) {
  return (
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 shrink-0 rounded-full bg-gray-200 dark:bg-gray-800" />
      <div className="max-w-[75%] rounded-2xl rounded-tl-md bg-white p-3 shadow-sm ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-800">
        <p className="leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
