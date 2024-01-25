import DatabaseClient from "@/lib/supabase/db/dbClient";
import { createSupabaseServer } from "@/lib/supabase/server";
import Joi, { date } from "joi";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LogEntry, LogInfo } from "@/lib/supabase/db/types";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.array().items({
      exerciseId: Joi.number().required(),
      notes: Joi.string().optional(),
      info: Joi.array()
        .items({
          set: Joi.number().required(),
          reps: Joi.number().required(),
          weight: Joi.number().required(),
        })
        .required(),
      date: Joi.date().required(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const data = await dbClient.setLogs(body as LogEntry[]);
  return NextResponse.json(data);
}
