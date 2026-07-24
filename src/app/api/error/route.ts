import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const POST = apiRoute(async (request: Request) => {
  const dbClient = await createDatabaseClient();

  const res = await request.json();
  return NextResponse.json({ res });
});
