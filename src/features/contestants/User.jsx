export default function User({ children }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[75%] rounded-2xl rounded-tr-md bg-brand/10 p-3 ring-1 ring-brand/20 dark:bg-brand/20">
        <p className="leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
