import Bot from '../contestants/Bot';
import User from '../contestants/User';

export default function ChatMessages() {
  return (
    <main
      className="flex-1 overflow-y-auto overscroll-contain"
      id="chat-log"
      role="log"
      aria-live="polite"
      aria-relevant="additions"
      aria-atomic="false"
    >
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        {/* message bubbles */}
        <Bot>Hi! How can I help?</Bot>
        <User>Show me best practices…</User>
        {/* ... */}
        <div id="end-of-messages" />
      </div>
    </main>
  );
}
