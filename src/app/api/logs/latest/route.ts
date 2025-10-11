import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const exerciseIdsParam = searchParams.get("exercise_ids");

  const exerciseIds = exerciseIdsParam
    ? exerciseIdsParam.split(",").map((id) => Number(id))
    : [];

  try {
    const schema = Joi.object({
      exerciseIds: Joi.array().items(Joi.number().integer()).min(1).required(),
    });

    await schema.validateAsync({ exerciseIds });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = await DatabaseClient.build();
  const data = await dbClient.getLatestLogs(exerciseIds);

  return NextResponse.json(data);
}
