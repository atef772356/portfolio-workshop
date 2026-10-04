import Link from "next/link";

import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <AuthShell
      title="Create account."
      subtitle="Join with email and password. Google sign-in is available on the login page."
    >
      <RegisterForm />
      <p className="muted mt-6 text-sm">
        Already registered?{" "}
        <Link className="text-[var(--blue)]" href="/login">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}
