import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const messages = await db.message.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <>
      <h1 className="display text-6xl font-black">Messages.</h1>
      <div className="mt-10 space-y-4">
        {messages.map((message) => (
          <article className="panel rounded-2xl p-6" key={message.id}>
            <div className="flex justify-between gap-4">
              <b>{message.subject}</b>
              <span className="font-mono text-xs text-[var(--red)]">
                {message.status}
              </span>
            </div>
            <p className="muted mt-2 text-sm">
              {message.name} · {message.email} ·{" "}
              {message.createdAt.toLocaleDateString()}
            </p>
            <p className="mt-5 leading-7">{message.message}</p>
          </article>
        ))}
        {!messages.length && <p className="muted">No messages yet.</p>}
      </div>
    </>
  );
}
