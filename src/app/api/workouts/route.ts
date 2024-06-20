import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function GET(_request: Request) {
  const dbClient = new DatabaseClient();
  const workouts = await dbClient.getWorkouts();
  return NextResponse.json(workouts);
}
