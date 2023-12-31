import Joi from "joi";
import { NextResponse } from "next/server";

export async function validateWorkoutBody(body: any, response: NextResponse) {
  try {
    const schema = Joi.object({
      userId: Joi.string().uuid().required(),
    });

    await schema.validateAsync(body);
  } catch (e: any) {
    response = NextResponse.json({ error: e.message }, { status: 400 });
  }

  return response;
}

export async function validateWorkoutCreateBody(
  body: any,
  response: NextResponse
) {
  try {
    const schema = Joi.object({
      userId: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().optional(),
    });

    await schema.validateAsync(body);
  } catch (e: any) {
    response = NextResponse.json({ error: e.message }, { status: 400 });
  }

  return response;
}
