import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import Workouts from "./workouts";

export default async function WorkoutsPage() {
  const db = await createDatabaseClient();
  const workouts = await db.getWorkouts();

  return (
    <div>
      <Workouts initialWorkouts={workouts} />
    </div>
  );
}
