import { NextResponse } from "next/server";
import { db } from "@/db";
import { searches } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const recent = await db
      .select()
      .from(searches)
      .orderBy(desc(searches.createdAt))
      .limit(5);

    return NextResponse.json({ recent });
  } catch {
    return NextResponse.json({ recent: [] });
  }
}
