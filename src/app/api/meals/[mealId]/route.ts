import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { mealId: string } }
) {
  const dbClient = await DatabaseClient.build();
  await dbClient.deleteMeal(params.mealId);
  return NextResponse.json({ success: true });
}
