
export default function ChatMessages() {
  return (
    <div
      className="flex-1 overflow-y-auto overscroll-contain"
      id="chat-log"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-atomic="false"
    >
      <div className="mx-auto max-w-3xl space-y-4 px-4 py-6">
        {/* <Bot>Hi! How can I help?</Bot>
        <User>Show me best practices…</User>
        <div id="end-of-messages" /> */}
      </div>
    </div>
  );
}
