import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back."
      subtitle="Sign in to your account or admin workspace."
    >
      <LoginForm />
      <p className="muted mt-6 text-sm">
        New here?{" "}
        <Link className="text-[var(--blue)]" href="/register">
          Create an account
        </Link>
      </p>
    </AuthShell>
  );
}
