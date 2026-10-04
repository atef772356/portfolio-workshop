import { HomePage } from "@/components/home/home-page";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Page() {
  const projects = await db.project.findMany({
    where: { featured: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return <HomePage projects={projects} />;
}
