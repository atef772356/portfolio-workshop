import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/layout/site-header";
import { db } from "@/lib/db";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

async function getProject(slug: string) {
  return db.project.findUnique({
    where: { slug },
  });
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);

  return {
    title: project
      ? `${project.title} | Atef Mohamed`
      : "Project not found | Atef Mohamed",
    description: project?.summary,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main>
      <SiteHeader />

      <article className="blueprint min-h-screen px-6 pb-24 pt-36">
        <div className="mx-auto max-w-7xl">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[var(--blue)]"
          >
            <ArrowLeft size={16} />
            BACK TO WORK
          </Link>

          <header className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p
                className="font-mono text-xs font-bold"
                style={{ color: project.accent }}
              >
                CASE STUDY / FULL-STACK PRODUCT
              </p>
              <h1 className="display mt-6 max-w-5xl text-6xl font-black md:text-8xl">
                {project.title}
                <span style={{ color: project.accent }}>.</span>
              </h1>
              <p className="muted mt-8 max-w-2xl text-lg leading-8">
                {project.summary}
              </p>
            </div>

            <div className="panel rounded-[2rem] p-7">
              <p className="font-mono text-xs font-bold">TECH STACK</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((technology) => (
                  <span
                    className="rounded-full border px-3 py-1 text-xs font-bold"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-bold text-[var(--paper)]"
                  >
                    LIVE PROJECT
                    <ArrowUpRight size={17} />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold"
                  >
                    <Github size={17} />
                    GITHUB
                  </a>
                )}
              </div>
            </div>
          </header>

          <div className="mt-16 overflow-hidden rounded-[2rem] border bg-[var(--panel)]">
            {project.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-[360px] w-full object-cover md:h-[520px]"
              />
            ) : (
              <div
                className="blueprint flex h-[360px] items-end p-8 md:h-[520px] md:p-12"
                style={{ borderTop: `10px solid ${project.accent}` }}
              >
                <p className="font-mono text-xs font-bold">
                  COMMERCE / OPERATIONS / CONTROL
                </p>
              </div>
            )}
          </div>

          <section className="mt-16 grid gap-5 md:grid-cols-3">
            {[
              ["THE PROBLEM", project.problem],
              ["THE SYSTEM", project.solution],
              ["THE OUTCOME", project.result],
            ].map(([label, text]) => (
              <div className="panel rounded-[1.5rem] p-7" key={label}>
                <p
                  className="font-mono text-xs font-bold"
                  style={{ color: project.accent }}
                >
                  {label}
                </p>
                <p className="muted mt-5 leading-7" dir="auto">
                  {text}
                </p>
              </div>
            ))}
          </section>
        </div>
      </article>
    </main>
  );
}
