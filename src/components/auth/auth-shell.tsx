import Link from "next/link";

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <main className="blueprint grid min-h-screen place-items-center p-6">
      <section className="panel w-full max-w-md rounded-[2rem] p-8">
        <Link className="font-black" href="/">
          ATEF / WORKSHOP
        </Link>
        <h1 className="display mt-12 text-5xl font-black">{title}</h1>
        <p className="muted mb-8 mt-4">{subtitle}</p>
        {children}
      </section>
    </main>
  );
}
