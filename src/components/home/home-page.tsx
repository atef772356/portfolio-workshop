import type { Project } from "@prisma/client";

import { ContactForm } from "@/components/home/contact-form";
import { Hero } from "@/components/home/hero";
import { ProjectStory } from "@/components/home/project-story";
import { WorkshopMethod } from "@/components/home/workshop-method";
import { SiteHeader } from "@/components/layout/site-header";

const technologies = [
  "NEXT.JS",
  "NESTJS",
  "TYPESCRIPT",
  "POSTGRESQL",
  "PRISMA",
  "DOCKER",
];

export function HomePage({ projects }: { projects: Project[] }) {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <WorkshopMethod />
      <section className="px-6 py-28" id="work">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-xs font-bold text-[var(--blue)]">
                SELECTED SYSTEMS
              </p>
              <h2 className="display mt-5 text-5xl font-black md:text-8xl">
                Work, explained.
              </h2>
            </div>
            <p className="muted hidden max-w-sm md:block">
              Not a gallery of screenshots. Each project is framed by the
              problem, system, and outcome.
            </p>
          </div>
          <div className="space-y-[40vh] pb-[40vh]">
            {projects.map((project, index) => (
              <ProjectStory key={project.id} index={index + 1} {...project} />
            ))}
          </div>
        </div>
      </section>
      <section className="overflow-hidden border-y py-6">
        <div className="flex w-max animate-ticker">
          {[...technologies, ...technologies].map((item, index) => (
            <b
              className="mx-10 flex items-center gap-10 text-2xl"
              key={`${item}-${index}`}
            >
              {item}
              <span className="text-[var(--acid)]">✦</span>
            </b>
          ))}
        </div>
      </section>
      <section className="px-6 py-28" id="contact">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="font-mono text-xs font-bold text-[var(--red)]">
              OPEN A NEW BUILD
            </p>
            <h2 className="display mt-6 text-6xl font-black md:text-8xl">
              Bring the rough idea.
            </h2>
            <p className="muted mt-7 max-w-lg text-lg leading-8">
              We will turn it into a clear system, a confident interface, and
              something people can actually use.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
      <footer className="border-t px-6 py-8">
        <div className="mx-auto flex max-w-7xl justify-between font-mono text-xs">
          <b>ATEF MOHAMED / 2026</b>
          <span className="muted">CAIRO · AVAILABLE WORLDWIDE</span>
        </div>
      </footer>
    </main>
  );
}
