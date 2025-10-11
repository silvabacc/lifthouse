"use server";

import DatabaseClient from "@/lib/supabase/db/dbClient";
import { revalidateTag } from "next/cache";

export const setFiveThreeOne = async () => {};

export const resetWeeks = async () => {
  const database = await DatabaseClient.build();
  database.setFiveThreeOne({ current_week: 1, completed: [] });
};

export const increasePersonalBests = async () => {
  const client = await DatabaseClient.build();
  const data = await client.getFiveThreeOne();

  const { bench, squat, deadlift, ohp } = data;

  const newPersonalBests = {
    bench: bench.pb + 2,
    squat: squat.pb + 5,
    deadlift: deadlift.pb + 5,
    ohp: ohp.pb + 2,
    current_week: 1,
  };

  return client.setFiveThreeOne(newPersonalBests);
};

export const getLatestLogs = async (exerciseIds: number[]) => {
  const database = await DatabaseClient.build();
  return database.getLatestLogs(exerciseIds);
};

export const goNextWeek = async (week: number) => {
  const database = await DatabaseClient.build();
  database.setFiveThreeOne({ current_week: week + 1, completed: [] });
};
