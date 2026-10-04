import { auth } from "@/auth";
import Link from "next/link";

import { ThemeToggle } from "@/components/ui/theme-toggle";

export async function SiteHeader() {
  const session = await auth();
  const isAdmin = session?.user.role === "ADMIN";

  return (
    <header className="fixed inset-x-0 top-0 z-50 p-4">
      <nav className="panel mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 shadow-xl shadow-black/5">
        <Link className="font-black tracking-tight" href="/">
          ATEF / WORKSHOP
        </Link>
        <div className="hidden items-center gap-7 text-sm md:flex">
          <a href="#work">Work</a>
          <a href="#method">Method</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAdmin && (
            <Link
              className="hidden rounded-full bg-[var(--red)] px-4 py-2 text-sm font-bold text-white sm:inline-flex"
              href="/admin"
            >
              Admin
            </Link>
          )}
          <Link
            className="rounded-full bg-[var(--ink)] px-4 py-2 text-sm font-bold text-[var(--paper)]"
            href={session ? "/account" : "/login"}
          >
            {session ? "Account" : "Sign in"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
