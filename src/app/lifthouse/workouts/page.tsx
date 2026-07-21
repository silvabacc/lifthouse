import { PageAnimation } from "@/app/animations/pageAnimation";
import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import Workouts from "./workouts";

export default async function WorkoutsPage() {
  const db = await createDatabaseClient();
  const workouts = await db.getWorkouts();

  return (
    <PageAnimation>
      <Workouts initialWorkouts={workouts} />
    </PageAnimation>
  );
}
