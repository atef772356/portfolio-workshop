"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const input =
    "w-full rounded-xl border bg-transparent p-3 outline-none focus:border-[var(--blue)]";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        Object.fromEntries(new FormData(event.currentTarget)),
      ),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error ?? "Registration failed.");
      return;
    }

    router.push("/login");
  }

  return (
    <form className="space-y-3" onSubmit={submit}>
      <input
        className={input}
        name="name"
        placeholder="Name"
        required
        minLength={2}
      />
      <input
        className={input}
        name="email"
        placeholder="Email"
        required
        type="email"
      />
      <input
        className={input}
        name="password"
        placeholder="Password, 8+ characters"
        required
        type="password"
        minLength={8}
      />
      <button className="w-full rounded-xl bg-[var(--red)] p-3 font-bold text-white">
        Create account
      </button>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </form>
  );
}
