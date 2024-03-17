import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.alternatives().try(
      Joi.object({
        exerciseIds: Joi.array().items(Joi.number()).required(),
        rows: Joi.number().optional(),
      }),
      Joi.object({
        exerciseIds: Joi.array().items(Joi.number()).required(),
        startFrom: Joi.date().required(),
        endOn: Joi.date().required(),
      })
    );

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const { exerciseIds, rows, startFrom, endOn } = body;

  const dbClient = new DatabaseClient();
  const data = await dbClient.getLogs(exerciseIds, rows, startFrom, endOn);
  return NextResponse.json(data);
}
