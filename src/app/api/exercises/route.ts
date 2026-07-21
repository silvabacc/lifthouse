import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const GET = apiRoute(async (_request: Request) => {
  const dbClient = await createDatabaseClient();
  const data = await dbClient.getExercises();
  return NextResponse.json(data);
});
