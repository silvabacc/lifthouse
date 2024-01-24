import DatabaseClient from "@/lib/supabase/db/dbClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const dbClient = new DatabaseClient();

  const month = searchParams.get("month");
  const year = searchParams.get("year");

  if (month === null || year === null) {
    return NextResponse.json({
      error: "Must contain both month and year in search params",
    });
  }

  const data = await dbClient.getWeight(parseInt(month), parseInt(year));
  return NextResponse.json(data);
}
