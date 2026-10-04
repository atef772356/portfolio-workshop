"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

type ProjectStoryProps = {
  index: number;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  solution: string;
  result: string;
  techStack: string[];
  accent: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
};

export function ProjectStory({
  index,
  title,
  slug,
  summary,
  problem,
  solution,
  result,
  techStack,
  accent,
  imageUrl,
  liveUrl,
  githubUrl,
}: ProjectStoryProps) {
  const reduceMotion = useReducedMotion();

  const visibleTechnologies = techStack.slice(0, 3);
  const remainingTechnologies = Math.max(techStack.length - 3, 0);

  return (
  <motion.article
  initial={
    reduceMotion
      ? false
      : {
          opacity: 0,
          y: 40,
          scale: 0.98,
        }
  }
  whileInView={{
    opacity: 1,
    y: 0,
    scale: 1,
  }}
  viewport={{
    once: true,
    margin: "-80px",
  }}
  transition={{
    duration: 0.5,
    ease: "easeOut",
  }}
  className="panel group sticky top-2
   min-h-[60vh] overflow-hidden rounded-[2rem] shadow-2xl shadow-black/10"
  style={{
    borderTop: `8px solid ${accent}`,
    zIndex: index,
  }}
>
      <div className="grid lg:min-h-[420px] lg:grid-cols-[1fr_1fr]">
        <div className="flex flex-col p-7 md:p-10 lg:p-12">
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-xs font-bold">
              CASE / {String(index).padStart(2, "0")}
            </span>

            <span
              className="rounded-full border px-3 py-1 font-mono text-[10px] font-bold"
              style={{
                color: accent,
                borderColor: `${accent}55`,
              }}
            >
              {liveUrl ? "LIVE PROJECT" : "CASE STUDY"}
            </span>
          </div>

          <h3 className="display mt-8 text-4xl font-black md:text-5xl">
            {title}
          </h3>

          <p
            className="muted mt-6 max-w-xl text-base leading-8 md:text-lg"
            dir="auto"
          >
            {summary}
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {visibleTechnologies.map((technology) => (
              <span
                className="rounded-full border px-3 py-1 text-xs font-bold"
                key={technology}
              >
                {technology}
              </span>
            ))}

            {remainingTechnologies > 0 && (
              <span
                className="rounded-full px-3 py-1 text-xs font-bold text-white"
                style={{
                  backgroundColor: accent,
                }}
              >
                +{remainingTechnologies}
              </span>
            )}
          </div>

          <div className="mt-auto flex flex-wrap gap-3 pt-10">
            {liveUrl && (
              <motion.a
                href={liveUrl}
                target="_blank"
                rel="noreferrer"
                className="accent-button inline-flex items-center gap-2"
              >
               Project presentation
                <ArrowUpRight size={18} />
              </motion.a>
            )}

            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"
            >
             Case study
              <ArrowRight size={18} />
            </Link>

            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors hover:border-[var(--paper)] hover:text-[var(--paper)]"
              >
                <Github size={17} />
                GitHub
              </a>
            )}
          </div>
        </div>

        <div className="relative order-first min-h-[300px] overflow-hidden border-b lg:order-last lg:min-h-full lg:border-b-0 lg:border-l">
          {imageUrl ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt={title}
                className="h-full min-h-[300px] w-full object-cover lg:min-h-full"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </>
          ) : (
            <div className="blueprint flex h-full min-h-[300px] items-center justify-center p-8 lg:min-h-full">
              <div className="text-center">
                <ImageIcon
                  className="mx-auto"
                  size={48}
                  style={{ color: accent }}
                />

                <p className="muted mt-4 text-sm">
                 Add a link to the project image from the control panel.
                </p>
              </div>
            </div>
          )}

          <span className="absolute bottom-5 right-5 rounded-full border border-white/30 bg-black/70 px-3 py-1 font-mono text-[10px] font-bold text-white backdrop-blur-md">
            FULL-STACK PROJECT
          </span>
        </div>
      </div>

      <div className="grid border-t md:grid-cols-3 ">
        {[
          ["PROBLEM", problem],
          ["SYSTEM", solution],
          ["OUTCOME", result],
        ].map(([label, text]) => (
          <div
            className="border-b p-6 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            key={label}
          >
            <p
              className="font-mono text-[10px] font-bold"
              style={{ color: accent }}
            >
              {label}
            </p>

            <p className="muted mt-3 text-sm leading-6" dir="auto line-clamp-3">
              {text}
            </p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}