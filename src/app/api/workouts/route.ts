import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const dbClient = await createDatabaseClient();
  const workouts = await dbClient.getWorkouts();
  return NextResponse.json(workouts);
}
