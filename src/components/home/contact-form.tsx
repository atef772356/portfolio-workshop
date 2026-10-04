"use client";

import { useState } from "react";

export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const inputClass =
    "w-full border-b bg-transparent px-0 py-4 outline-none focus:border-[var(--blue)]";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    const form = event.currentTarget;
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form))),
    });

    if (response.ok) {
      form.reset();
      setState("sent");
    } else {
      setState("error");
    }
  }

  return (
    <form className="panel rounded-[2rem] p-7 md:p-10" onSubmit={submit}>
      <input
        className={inputClass}
        name="name"
        placeholder="Your name"
        required
        minLength={2}
      />
      <input
        className={inputClass}
        name="email"
        placeholder="Email address"
        required
        type="email"
      />
      <input
        className={inputClass}
        name="subject"
        placeholder="What are we building?"
        required
        minLength={3}
      />
      <textarea
        className={`${inputClass} min-h-32 resize-none`}
        name="message"
        placeholder="Context, goals, and constraints"
        required
        minLength={10}
      />
      <button
        className="mt-8 w-full rounded-full bg-[var(--red)] px-6 py-4 font-black text-white"
        disabled={state === "sending"}
      >
        {state === "sending" ? "Sending..." : "Send project brief"}
      </button>
      {state === "sent" && (
        <p className="mt-4 text-sm">Message received. Thank you.</p>
      )}
      {state === "error" && (
        <p className="mt-4 text-sm text-red-500">
          Please check the fields and try again.
        </p>
      )}
    </form>
  );
}
