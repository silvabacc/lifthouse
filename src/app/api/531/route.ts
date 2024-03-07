import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const dbClient = new DatabaseClient();
  const data = await dbClient.getFiveThreeOne();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.object({
      bench: Joi.number().required(),
      squat: Joi.number().required(),
      deadlift: Joi.number().required(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const data = await dbClient.setFiveThreeOne(body);
  return NextResponse.json(data);
}
