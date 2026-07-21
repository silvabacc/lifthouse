import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { BottomFadeInAnimation } from "@/app/animations/bottomFadeInAnimation";
import { useWorkoutIdContext } from "./context";
import DeleteExerciseButton from "./components/deleteExerciseButton";
import { LogVisual } from "../../components/logVisuals/logVisual";
import { SetRepPill } from "../../components/setRepPill";

export default function Charts() {
  const { workout, exercises } = useWorkoutIdContext();

  const isCustomWorkout = workout.template === WorkoutTemplate.custom;

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full">
      <div className="overflow-y-auto flex flex-col gap-4 pb-4">
        {workout.exercises.map((exercise, index) => {
          const exerciseInfo = exercises.find(
            (e) => e.exerciseId === exercise.exerciseId
          );
          return (
            <section
              key={`${exercise.exerciseId}-${index}`}
              className="rounded-xl border border-solid border-gray-100 p-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-2">
                <div className="flex items-center gap-3 min-w-0">
                  <h2 className="text-lg font-semibold m-0 truncate">
                    {exerciseInfo?.name}
                  </h2>
                  <SetRepPill sets={exercise.sets} reps={exercise.reps} />
                </div>
                {isCustomWorkout && (
                  <DeleteExerciseButton exerciseId={exercise.exerciseId} />
                )}
              </div>
              {exerciseInfo && <LogVisual exercise={exerciseInfo} />}
            </section>
          );
        })}
      </div>
    </BottomFadeInAnimation>
  );
}
