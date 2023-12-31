import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const schema = Joi.object({
      userId: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().optional(),
    });

    await schema.validateAsync(body);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const { userId, name, description } = body;
  const result = await dbClient.createWorkout(userId, name, description);
  return NextResponse.json(result);
}
