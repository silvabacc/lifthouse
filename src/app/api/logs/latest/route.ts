import DatabaseClient from "@/lib/supabase/db/dbClient";
import { createSupabaseServer } from "@/lib/supabase/server";
import Joi from "joi";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.object({
      exerciseIds: Joi.array().items(Joi.number()).required(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const { exerciseIds } = body;

  const dbClient = new DatabaseClient();
  const data = await dbClient.getLatestLogs(exerciseIds);
  return NextResponse.json(data);
}
