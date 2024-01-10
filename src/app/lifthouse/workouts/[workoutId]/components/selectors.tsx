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
};
export function SelectExercise({ defaultExercise }: SelectExerciseProps) {
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

  const onChange = async (exerciseId: number, value: number) => {
    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          exerciseId: value,
        };
      }
      return e;
    });

    const updatedWorkout = await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: newExercises,
    });

    if (!updatedWorkout) return;

    setWorkout(updatedWorkout);
  };

  return (
    <SelectElement
      defaultValue={defaultExercise.exerciseId}
      options={options}
      onChange={(value) =>
        onChange(defaultExercise.exerciseId, value as number)
      }
    />
  );
}

type SelectRepsSchemeProps = {
  defaultExercise: WorkoutExercise;
};
export function SelectRepsScheme({ defaultExercise }: SelectRepsSchemeProps) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const { updateWorkoutPlan } = useWorkout();

  const repSchemeOptions = getRepScheme(workout.template).map((r, index) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  const onChangeReps = async (exerciseId: number, value: string) => {
    const [sets, reps] = value.split(":");

    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          sets: parseInt(sets),
          reps: reps,
        };
      }
      return e;
    });

    const updatedWorkout = await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: newExercises,
    });

    if (!updatedWorkout) return;

    setWorkout(updatedWorkout);
  };

  return (
    <SelectElement
      options={repSchemeOptions}
      onChange={(value) =>
        onChangeReps(defaultExercise.exerciseId, value as string)
      }
      defaultValue={formatValue(defaultExercise.sets, defaultExercise.reps)}
    />
  );
}
