import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";

export default async function AccountPage() {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <main className="blueprint min-h-screen p-6 md:p-12">
      <section className="panel mx-auto max-w-4xl rounded-[2rem] p-8 md:p-12">
        <p className="font-mono text-xs text-[var(--blue)]">ACCOUNT</p>
        <h1 className="display mt-6 text-6xl font-black">
          Hello, {session.user.name ?? "there"}.
        </h1>
        <p className="muted mt-5">{session.user.email}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          {session.user.role === "ADMIN" && (
            <a
              className="rounded-full bg-[var(--red)] px-5 py-3 font-bold text-white"
              href="/admin"
            >
              Open admin
            </a>
          )}
          <a className="rounded-full border px-5 py-3 font-bold" href="/">
            Back to website
          </a>
        </div>
        <form
          className="mt-10"
          action={async () => {
            "use server";
            await signOut({ redirectTo: "/" });
          }}
        >
          <button className="text-sm underline">Sign out</button>
        </form>
      </section>
    </main>
  );
}
