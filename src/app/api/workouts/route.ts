import DatabaseClient from "@/lib/supabase/db/dbClient";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const dbClient = new DatabaseClient();
  const { userId } = await request.json();
  const workouts = await dbClient.getWorkouts(userId);
  return Response.json(workouts);
}
