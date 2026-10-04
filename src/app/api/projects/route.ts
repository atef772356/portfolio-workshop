import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { projectSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const session = await auth();

  if (session?.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = projectSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project data." },
      { status: 400 },
    );
  }

  const project = await db.project.create({
    data: {
      ...parsed.data,
      slug: createSlug(parsed.data.title),
      liveUrl: parsed.data.liveUrl || null,
      githubUrl: parsed.data.githubUrl || null,
      imageUrl: parsed.data.imageUrl || null,
    },
  });

  return NextResponse.json(project, { status: 201 });
}
