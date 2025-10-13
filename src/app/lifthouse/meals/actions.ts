"use server";

import DatabaseClient from "@/lib/supabase/db/dbClient";

export const deleteMeal = async (mealId: string) => {
  const dbClient = await DatabaseClient.build();
  await dbClient.deleteMeal(mealId);
};
