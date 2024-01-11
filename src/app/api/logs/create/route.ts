import DatabaseClient from "@/lib/supabase/db/dbClient";
import { createSupabaseServer } from "@/lib/supabase/server";
import Joi, { date } from "joi";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { LogInfo } from "@/lib/supabase/db/types";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.object({
      exerciseIds: Joi.number().required(),
      date: Joi.date().required(),
      notes: Joi.string().optional(),
      info: Joi.object<LogInfo>({
        set: Joi.number().required(),
        reps: Joi.number().required(),
        weight: Joi.number().required(),
      }).required(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const { exerciseId, date, notes, info } = body;

  const supabase = createSupabaseServer(cookies());
  const id = (await supabase.auth.getSession()).data.session?.user.id;

  if (!id) {
    return NextResponse.json({ error: "Session timeout" }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const data = await dbClient.setLogs({ exerciseId, date, notes, info });
  return NextResponse.json(data);
}
