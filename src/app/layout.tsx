import { ThemeProvider } from "@/components/providers/theme-provider";
import { LinkedInFloat } from "@/components/layout/linkedin-float";
import type { Metadata } from "next";
import { IBM_Plex_Mono, Manrope } from "next/font/google";

import "./globals.css";

const sans = Manrope({ subsets: ["latin"], variable: "--font-sans" });
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Atef Mohamed | Digital Workshop",
  description:
    "Full-stack product engineering, system architecture, and expressive interfaces.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sans.variable} ${mono.variable} font-sans`}>
        <ThemeProvider>
          {children}
          <LinkedInFloat />
        </ThemeProvider>
      </body>
    </html>
  );
}
