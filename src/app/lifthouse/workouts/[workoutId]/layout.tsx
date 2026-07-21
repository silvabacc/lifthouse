import { LayoutAnimation } from "@/app/animations/layoutAnimation";
import { createDatabaseClient } from "@/lib/supabase/db/dbClient";
import { WorkoutIdContextProvider } from "./context";

export default async function WorkoutIdLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ workoutId: string }>;
  }
) {
  const params = await props.params;
  const { children } = props;

  const db = await createDatabaseClient();
  const [workout, exercises] = await Promise.all([
    db.getWorkoutData(params.workoutId),
    db.getExercises(),
  ]);

  return (
    <LayoutAnimation>
      <WorkoutIdContextProvider initialWorkout={workout} initialExercises={exercises}>
        {children}
      </WorkoutIdContextProvider>
    </LayoutAnimation>
  );
}
