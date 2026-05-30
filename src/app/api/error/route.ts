import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const dbClient = await createDatabaseClient();

  const res = await request.json();
  return NextResponse.json({ res });
}
