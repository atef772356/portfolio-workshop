import { NextResponse } from "next/server";

import { db } from "@/lib/db";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid message data." },
      { status: 400 },
    );
  }

  await db.message.create({ data: parsed.data });

  return NextResponse.json({ ok: true }, { status: 201 });
}
