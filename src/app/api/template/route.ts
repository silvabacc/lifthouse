import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const dbClient = new DatabaseClient();
  const workouts = await dbClient.getTemplates();
  return NextResponse.json(workouts);
}
