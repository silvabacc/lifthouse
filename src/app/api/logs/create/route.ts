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
      notes: Joi.string().allow(null, "").optional(),
      info: Joi.array()
        .items(
          Joi.object({
            set: Joi.number().required().messages({
              "any.required": "Set number is required.",
              "number.base": "Set must be a number.",
            }),
            reps: Joi.number().required().messages({
              "any.required": "Reps are required.",
              "number.base": "Reps must be a number.",
            }),
            weight: Joi.number().required().messages({
              "any.required": "Weight is required.",
              "number.base": "Weight must be a number.",
            }),
          })
        )
        .required()
        .messages({
          "array.base": "Info must be an array.",
          "any.required": "Please record atleast one set",
        }),
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
