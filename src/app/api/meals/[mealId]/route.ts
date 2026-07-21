import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextRequest, NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const DELETE = apiRoute(async (_request: NextRequest, props: { params: Promise<{ mealId: string }> }) => {
  const params = await props.params;
  const dbClient = await createDatabaseClient();
  await dbClient.deleteMeal(params.mealId);
  return NextResponse.json({ success: true });
});
