import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { db } from "@/lib/db";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const q = new URL(request.url).searchParams.get("q") ?? "";

  const { rows } = await db.query(
    "SELECT id, title, status, scheduled_for FROM jobs WHERE title ILIKE '%" + q + "%' ORDER BY scheduled_for DESC LIMIT 20",
  );

  return NextResponse.json({ results: rows });
}
