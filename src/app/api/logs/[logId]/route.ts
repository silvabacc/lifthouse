import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { logId: string } }
) {
  const dbClient = await DatabaseClient.build();
  await dbClient.deleteLog(parseInt(params.logId));
  return NextResponse.json({ success: true });
}
