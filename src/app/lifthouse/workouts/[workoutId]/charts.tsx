import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { Typography } from "antd";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import { useWorkoutIdContext } from "./context";
import DeleteExerciseButton from "./components/deleteExerciseButton";
import { LogVisual } from "../../components/logVisuals/logVisual";

const { Text } = Typography;

export default function Charts() {
  const { workout, exercises } = useWorkoutIdContext();

  const isCustomWorkout = workout.template === WorkoutTemplate.custom;

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full">
      <div className="overflow-y-auto">
        {workout.exercises.map((exercise, index) => {
          const exerciseInfo = exercises.find(
            (e) => e.exerciseId === exercise.exerciseId
          );
          return (
            <div key={`${exercise.exerciseId}-${index} flex flex-wrap`}>
              <div className="flex flex-wrap justify-between items-start z-10 bg-white w-full pb-2">
                <div className="flex justify-between">
                  <h1 className="text-lg font-medium m-0">
                    {exerciseInfo?.name}
                  </h1>
                  <div className="w-12">
                    {isCustomWorkout && (
                      <DeleteExerciseButton exerciseId={exercise.exerciseId} />
                    )}
                  </div>
                </div>
                <Text className="text-base mt-2" keyboard>
                  {exercise.sets} x {exercise.reps}
                </Text>
              </div>
              {exerciseInfo && <LogVisual exercise={exerciseInfo} />}
            </div>
          );
        })}
      </div>
    </BottomFadeInAnimation>
  );
}
