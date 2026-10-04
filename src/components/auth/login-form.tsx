"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm() {
  const [error, setError] = useState("");
  const input =
    "w-full rounded-xl border bg-transparent p-3 outline-none focus:border-[var(--blue)]";

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setError("Incorrect email or password.");
      return;
    }

    window.location.href = "/account";
  }

  return (
    <div className="space-y-4">
      <button
        className="w-full rounded-xl bg-[var(--ink)] p-3 font-bold text-[var(--paper)]"
        onClick={() => signIn("google", { callbackUrl: "/account" })}
      >
        Continue with Google
      </button>
      <p className="muted text-center text-xs">OR USE EMAIL</p>
      <form className="space-y-3" onSubmit={submit}>
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
          placeholder="Password"
          required
          type="password"
          minLength={8}
        />
        <button className="w-full rounded-xl bg-[var(--blue)] p-3 font-bold text-white">
          Sign in
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
    </div>
  );
}
