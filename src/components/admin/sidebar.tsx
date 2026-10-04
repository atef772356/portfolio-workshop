import Link from "next/link";

import { signOut } from "@/auth";

const links = [
  ["Overview", "/admin"],
  ["Projects", "/admin/projects"],
  ["Users", "/admin/users"],
  ["Messages", "/admin/messages"],
];

export function AdminSidebar() {
  return (
    <aside className="border-b p-6 md:min-h-screen md:w-64 md:border-b-0 md:border-r">
      <b>ATEF / ADMIN</b>
      <nav className="mt-10 grid gap-4">
        {links.map(([label, href]) => (
          <Link href={href} key={href}>
            {label}
          </Link>
        ))}
        <Link href="/">View website</Link>
      </nav>
      <form
        className="mt-10"
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button className="text-sm text-[var(--red)]">Sign out</button>
      </form>
    </aside>
  );
}
