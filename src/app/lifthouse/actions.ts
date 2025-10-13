"use server";

import DatabaseClient from "@/lib/supabase/db/dbClient";

export const deleteLog = async (logId: number) => {
  const dbClient = await DatabaseClient.build();
  await dbClient.deleteLog(logId);
};
