import {
  Exercise,
  ExerciseConfiguration,
  WorkoutTemplate,
} from "@/lib/supabase/db/types";
import {
  acceptedExerciseTypesForExercises,
  formatValue,
  getRepScheme,
  intersection,
} from "../utils";
import SelectElement, { Options } from "./selectComponent";
import { useWorkoutIdContext } from "../context";
import { useEffect, useState } from "react";

type SelectExerciseProps = {
  items: ExerciseConfiguration[];
  defaultExercise: ExerciseConfiguration;
  onChange: (exerciseId: number, value: number) => void;
};
export function SelectExercise({
  defaultExercise,
  items,
  onChange,
}: SelectExerciseProps) {
  const { exercises, workout } = useWorkoutIdContext();
  const findExercise = exercises.find(
    (e) => e.exerciseId === defaultExercise.exerciseId
  );
  const [currentExercises, setCurrentExercises] = useState<number[]>(
    items.map((e) => e.exerciseId)
  );

  useEffect(() => {
    setCurrentExercises(items.map((e) => e.exerciseId));
  }, [items]);

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
  const options: Options[] = (
    workout.template !== WorkoutTemplate.custom
      ? filteredExercisesWithType
      : exercises
  ).map((e) => ({
    value: e.exerciseId,
    label: e.name,
    disabledOptions: {
      disabled: currentExercises.includes(e.exerciseId),
      message: "This exercise is already in the workout",
    },
  }));

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
  defaultExercise: ExerciseConfiguration;
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
