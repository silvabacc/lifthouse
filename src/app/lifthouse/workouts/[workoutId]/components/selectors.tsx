import { WorkoutExercise, WorkoutTemplate } from "@/lib/supabase/db/types";
import {
  acceptedExerciseTypesForExercises,
  formatValue,
  getRepScheme,
  intersection,
} from "../utils";
import SelectElement from "./selectComponent";
import { useWorkout } from "../../hooks/useWorkout";
import { useWorkoutIdContext } from "../context";

type SelectExerciseProps = {
  defaultExercise: WorkoutExercise;
  onChange: (exerciseId: number, value: number) => void;
};
export function SelectExercise({
  defaultExercise,
  onChange,
}: SelectExerciseProps) {
  const { updateWorkoutPlan } = useWorkout();
  const { exercises, workout, setWorkout } = useWorkoutIdContext();
  const findExercise = exercises.find(
    (e) => e.exerciseId === defaultExercise.exerciseId
  );

  // Find common exercise types
  const commonType = findExercise?.exerciseType.find((type) =>
    acceptedExerciseTypesForExercises(workout.template).includes(type)
  );

  //With the current exercise selection, find all relevant exercises
  //This is done via searching the exercise types
  const filteredExercisesWithType = exercises
    .filter((e) => {
      if (!commonType) return false;
      return e.exerciseType.includes(commonType);
    })
    .filter((e) =>
      intersection(e.exerciseType, findExercise?.exerciseType ?? [])
    );

  //We only want to apply the exercises if a template is applied
  const options = (
    workout.template !== WorkoutTemplate.custom
      ? filteredExercisesWithType
      : exercises
  ).map((e) => ({ value: e.exerciseId, label: e.name }));

  return (
    <SelectElement
      value={defaultExercise.exerciseId}
      options={options}
      onChange={(value) =>
        onChange(defaultExercise.exerciseId, value as number)
      }
    />
  );
}

type SelectRepsSchemeProps = {
  defaultExercise: WorkoutExercise;
  onChange: (exerciseId: number, value: string) => void;
};
export function SelectRepsScheme({
  defaultExercise,
  onChange,
}: SelectRepsSchemeProps) {
  const { workout } = useWorkoutIdContext();

  const repSchemeOptions = getRepScheme(workout.template).map((r, index) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  return (
    <SelectElement
      options={repSchemeOptions}
      onChange={(value) =>
        onChange(defaultExercise.exerciseId, value as string)
      }
      value={formatValue(defaultExercise.sets, defaultExercise.reps)}
    />
  );
}
