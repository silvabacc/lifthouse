import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const day = searchParams.get("day");

  if (day === null) {
    return NextResponse.json({
      error: "Must contain both month and year in search params",
    });
  }

  const dbClient = new DatabaseClient();

  const schema = Joi.date().required();
  const { error } = schema.validate(day);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const data = await dbClient.getMeals(day);
  return NextResponse.json(data);
}
