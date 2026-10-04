import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const db = new PrismaClient();

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.toLowerCase();
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.upsert({
    where: { email },
    update: { role: Role.ADMIN, passwordHash },
    create: {
      email,
      name: "Atef Mohamed",
      role: Role.ADMIN,
      passwordHash,
    },
  });
}

async function seedProjects() {
  const projects = [
    {
      title: "Learning Operating System",
      slug: "learning-operating-system",
      summary:
        "A complete system for courses, quizzes, progress, discussions, and certificates.",
      problem:
        "Learning teams needed one coherent workflow instead of disconnected tools.",
      solution:
        "A role-aware platform with modular content, assessments, and progress tracking.",
      result:
        "A production-shaped LMS architecture ready for real content and teams.",
      techStack: ["Next.js", "NestJS", "PostgreSQL", "Prisma"],
      accent: "#1647FF",
      featured: true,
      sortOrder: 1,
    },
    {
      title: "Commerce Control Room",
      slug: "commerce-control-room",
      summary:
        "A storefront and operations dashboard designed as one connected product.",
      problem:
        "Storefront and operations data were separated and slow to act on.",
      solution: "Unified product, order, inventory, and analytics workflows.",
      result:
        "A clearer path from browsing to fulfillment and business decisions.",
      techStack: ["Next.js", "TypeScript", "PostgreSQL"],
      accent: "#FF3B30",
      featured: true,
      sortOrder: 2,
    },
  ];

  for (const project of projects) {
    await db.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
}

async function main() {
  await seedAdmin();
  await seedProjects();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
