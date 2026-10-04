const steps = [
  [
    "01",
    "Discover",
    "Define the users, problem, constraints, and success signal.",
  ],
  ["02", "Architect", "Shape data, permissions, APIs, and product boundaries."],
  ["03", "Craft", "Build the interface and backend as one coherent system."],
  ["04", "Ship", "Test, deploy, observe, document, and improve."],
];

export function WorkshopMethod() {
  return (
    <section className="px-6 py-28" id="method">
      <div className="mx-auto max-w-7xl">
        <p className="font-mono text-xs font-bold text-[var(--red)]">
          THE WORKSHOP METHOD
        </p>
        <div className="mt-8 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
          <h2 className="display text-5xl font-black md:text-7xl">
            One process. No handoff gaps.
          </h2>
          <div className="border-t">
            {steps.map(([number, title, text]) => (
              <article
                className="grid gap-4 border-b py-6 md:grid-cols-[70px_180px_1fr]"
                key={number}
              >
                <span className="font-mono text-[var(--blue)]">{number}</span>
                <h3 className="text-xl font-black">{title}</h3>
                <p className="muted leading-7">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
