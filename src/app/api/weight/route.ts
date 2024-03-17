import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
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

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const schema = Joi.object({
      weight: Joi.number().required(),
      date: Joi.date().required(),
    });
    schema.validateAsync(body);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const { weight, date } = body;
  const db = new DatabaseClient();
  const data = await db.createWeight(weight, date);
  return NextResponse.json(data);
}
