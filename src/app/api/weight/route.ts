import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const GET = apiRoute(async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;

  const dbClient = await createDatabaseClient();

  const month = searchParams.get("month");
  const year = searchParams.get("year");

  if (month === null || year === null) {
    return NextResponse.json(
      { error: "Must contain both month and year in search params" },
      { status: 400 }
    );
  }

  const data = await dbClient.getWeight(parseInt(month), parseInt(year));
  return NextResponse.json(data);
});

export const POST = apiRoute(async (request: NextRequest) => {
  const body = await request.json();

  try {
    const schema = Joi.object({
      weight: Joi.number().required(),
      date: Joi.date().required(),
    });
    await schema.validateAsync(body);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const { weight, date } = body;
  const db = await createDatabaseClient();
  const data = await db.createWeight(weight, date);
  return NextResponse.json(data);
});
