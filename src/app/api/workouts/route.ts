import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const dbClient = new DatabaseClient();
  const { userId } = await request.json();
  const workouts = await dbClient.getWorkouts(userId);
  return NextResponse.json(workouts);
}
