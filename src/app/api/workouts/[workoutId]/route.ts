import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { workoutId: string } }
) {
  const dbClient = new DatabaseClient();
  await dbClient.deleteWorkout(params.workoutId);
  return NextResponse.json({ success: true });
}
