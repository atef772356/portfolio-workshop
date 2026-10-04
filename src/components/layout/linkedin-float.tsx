import { Linkedin } from "lucide-react";

const linkedinUrl =
  
  "https://www.linkedin.com/in/atef-mohamed-539223325/";

export function LinkedInFloat() {
  return (
    <a
      aria-label="Connect with Atef Mohamed on LinkedIn"
      className="fixed bottom-6 right-6 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#0a66c2] text-white shadow-lg shadow-black/20 transition-transform hover:-translate-y-1 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#0a66c2]/40"
      href={linkedinUrl}
      rel="noreferrer"
      target="_blank"
      title="Connect on LinkedIn"
    >
      <Linkedin size={25} strokeWidth={2.5} />
    </a>
  );
}
