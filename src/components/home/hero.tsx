"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

const stages = ["IDEA", "SYSTEM", "INTERFACE", "PRODUCT"];

export function Hero() {
  return (
    <section className="blueprint min-h-screen px-6 pb-20 pt-36">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
        <div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-xs font-bold text-[var(--blue)]"
          >
            FULL-STACK PRODUCT ENGINEER / CAIRO
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="display mt-8 max-w-5xl text-6xl font-black md:text-8xl lg:text-[7.4rem]"
          >
            I turn rough ideas into working digital systems
            <span className="text-[var(--red)]">.</span>
          </motion.h1>
          <p className="muted mt-8 max-w-2xl text-lg leading-8">
            Strategy, backend architecture, and expressive interfaces built as
            one connected product.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, rotate: 4 }}
          animate={{ opacity: 1, rotate: -2 }}
          className="panel relative overflow-hidden rounded-[2rem] p-7"
        >
          <div className="absolute right-0 top-0 h-24 w-24 bg-[var(--acid)]" />
          <p className="font-mono text-xs">LIVE BUILD MAP</p>
          <div className="mt-16 space-y-5">
            {stages.map((stage, index) => (
              <div className="flex items-center gap-4" key={stage}>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[var(--ink)] font-mono text-xs text-[var(--paper)]">
                  {index + 1}
                </span>
                <div className="h-px flex-1 animate-pulseLine bg-[var(--blue)]" />
                <b className="font-mono">{stage}</b>
              </div>
            ))}
          </div>
          <ArrowDownRight className="mt-14 text-[var(--red)]" size={42} />
        </motion.div>
      </div>
    </section>
  );
}
