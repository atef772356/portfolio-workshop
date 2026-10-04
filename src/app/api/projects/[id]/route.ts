import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { createSlug } from "@/lib/slug";
import { projectSchema } from "@/lib/validation";

type RouteContext = { params: Promise<{ id: string }> };

async function isAdmin() {
  const session = await auth();
  return session?.user.role === "ADMIN";
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const parsed = projectSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid project data." },
      { status: 400 },
    );
  }

  const { id } = await context.params;
  const project = await db.project.update({
    where: { id },
    data: {
      ...parsed.data,
      slug: createSlug(parsed.data.title),
      liveUrl: parsed.data.liveUrl || null,
      githubUrl: parsed.data.githubUrl || null,
      imageUrl: parsed.data.imageUrl || null,
    },
  });

  return NextResponse.json(project);
}

export async function DELETE(_: Request, context: RouteContext) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  await db.project.delete({ where: { id } });

  return new NextResponse(null, { status: 204 });
}
