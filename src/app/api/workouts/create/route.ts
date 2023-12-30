import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const dbClient = new DatabaseClient();
  const { userId, name, description } = await request.json();
  const result = await dbClient.createWorkout(userId, name, description);
  return NextResponse.json(result);
}
