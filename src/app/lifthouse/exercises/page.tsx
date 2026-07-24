import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import ExercisesView from "./exercises.view";

export default async function ExercisesPage() {
  const db = await createDatabaseClient();
  const exercises = await db.getExercises();

  return (
    <div>
      <ExercisesView initialExercises={exercises} />
    </div>
  );
}
