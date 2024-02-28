import DatabaseClient from "@/lib/supabase/db/dbClient";
import Joi from "joi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const day = searchParams.get("day");

  if (day === null) {
    return NextResponse.json({
      error: "Must contain both month and year in search params",
    });
  }

  const dbClient = new DatabaseClient();

  const schema = Joi.date().required();
  const { error } = schema.validate(day);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const data = await dbClient.getMeals(day);
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const schema = Joi.object({
      mealTitle: Joi.string().required(),
      calories: Joi.number().required(),
      protein: Joi.number().required(),
      carbs: Joi.date().required(),
      fat: Joi.number().required(),
    });
    schema.validateAsync(body);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const dbClient = new DatabaseClient();
  const data = await dbClient.addMeal(body.mealTitle, {
    protein: body.protein,
    fat: body.fat,
    carbs: body.carbs,
    calories: body.calories,
  });
  return NextResponse.json(data);
}
