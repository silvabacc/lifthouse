import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { createSupabaseServer } from "@/lib/supabase/server";
import Joi from "joi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { apiRoute } from "@/lib/api";

export const PUT = apiRoute(async (request: NextRequest, props: { params: Promise<{ weightId: string }> }) => {
  const params = await props.params;
  const body = await request.json();

  try {
    const schema = Joi.object({
      weight: Joi.number().required(),
    });
    schema.validateAsync(body);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 });
  }

  const { weight } = body;
  const db = await createDatabaseClient();

  const data = await db.updateWeight(parseInt(params.weightId), weight);
  return NextResponse.json(data);
});

export const DELETE = apiRoute(async (_request: NextRequest, props: { params: Promise<{ weightId: string }> }) => {
  const params = await props.params;
  const db = await createDatabaseClient();
  await db.deleteWeight(parseInt(params.weightId));
  return NextResponse.json({ success: true });
});
