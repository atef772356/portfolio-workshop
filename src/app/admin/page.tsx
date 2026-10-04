import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [users, projects, messages, unread] = await Promise.all([
    db.user.count(),
    db.project.count(),
    db.message.count(),
    db.message.count({ where: { status: "UNREAD" } }),
  ]);
  const stats = [
    ["USERS", users],
    ["PROJECTS", projects],
    ["MESSAGES", messages],
    ["UNREAD", unread],
  ];

  return (
    <>
      <p className="font-mono text-xs text-[var(--blue)]">CONTROL ROOM</p>
      <h1 className="display mt-5 text-6xl font-black">Overview.</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(([label, value]) => (
          <div className="panel rounded-2xl p-6" key={label}>
            <p className="muted font-mono text-xs">{label}</p>
            <b className="mt-5 block text-5xl">{value}</b>
          </div>
        ))}
      </div>
    </>
  );
}
