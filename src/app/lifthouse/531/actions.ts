"use server";

import DatabaseClient from "@/lib/supabase/db/dbClient";

export const getFiveThreeOneData = async () => {
  const database = new DatabaseClient();
  return database.getFiveThreeOne();
};

export const resetWeeks = async () => {
  const database = new DatabaseClient();
  // const data = await database.getFiveThreeOne();
  console.log("here!", {
    bench_progress: 0,
    squat_progress: 0,
    oh_progress: 0,
    deadlift_progress: 0,
    current_week: 1,
    completed: [],
  });
  database.setFiveThreeOne({ current_week: 1, completed: [] });
};
