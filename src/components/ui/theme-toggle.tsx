"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const dark = resolvedTheme === "dark";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      aria-label="Toggle color theme"
      className="panel grid h-10 w-10 place-items-center rounded-full"
      onClick={() => setTheme(dark ? "light" : "dark")}
      type="button"
    >
      {mounted && (dark ? <Sun size={17} /> : <Moon size={17} />)}
    </button>
  );
}
