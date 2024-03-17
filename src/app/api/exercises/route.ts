import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const dbClient = new DatabaseClient();
  const data = await dbClient.getExercises();
  return NextResponse.json(data);
}
