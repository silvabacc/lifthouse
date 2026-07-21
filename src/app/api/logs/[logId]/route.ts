import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const DELETE = apiRoute(async (_request: Request, props: { params: Promise<{ logId: string }> }) => {
  const params = await props.params;
  const dbClient = await createDatabaseClient();
  await dbClient.deleteLog(parseInt(params.logId));
  return NextResponse.json({ success: true });
});
