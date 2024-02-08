import { ExerciseType, WorkoutTemplate } from "@/lib/supabase/db/types";
import { View } from "./charts";
import {
  BarChartOutlined,
  LineChartOutlined,
  TableOutlined,
} from "@ant-design/icons";

export const IntensityRepRange = [
  { sets: 3, reps: "3" },
  { sets: 3, reps: "5" },
  { sets: 3, reps: "5-8" },
  { sets: 4, reps: "4-6" },
  { sets: 5, reps: "5" },
  { sets: 5, reps: "3" },
  { sets: 5, reps: "2" },
  { sets: 5, reps: "1" },
  { sets: 1, reps: "1RM" },
  { sets: 1, reps: "3RM" },
  { sets: 1, reps: "5RM" },
  { sets: 3, reps: "1-5RM+2-3" },
  { sets: 3, reps: "1 @90%" },
  { sets: 4, reps: "1 @90%" },
  { sets: 5, reps: "1 @90%" },
  { sets: 1, reps: "3 @85%" },
  { sets: 2, reps: "3 @85%" },
  { sets: 1, reps: "5 @85%" },
  { sets: 2, reps: "5 @85%" },
  { sets: 3, reps: "6-8" },
  { sets: 3, reps: "6-10" },
  { sets: 3, reps: "30s-60s" },
];

export const VolumeRepRange = [
  { sets: 3, reps: "8-12" },
  { sets: 5, reps: "10" },
  { sets: 5, reps: "8" },
  { sets: 3, reps: "12-15" },
  { sets: 3, reps: "20" },
  { sets: 5, reps: "20" },
  { sets: 3, reps: "33" },
  { sets: 4, reps: "25" },
  { sets: 3, reps: "AMRAP" },
  { sets: 6, reps: "6" },
  { sets: 6, reps: "8" },
  { sets: 10, reps: "10" },
  { sets: 3, reps: "30s-60s" },
];

export function getRepScheme(template: WorkoutTemplate) {
  switch (template) {
    case WorkoutTemplate.upper_intensity:
    case WorkoutTemplate.lower_intensity:
      return IntensityRepRange;
    case WorkoutTemplate.upper_volume:
    case WorkoutTemplate.lower_volume:
      return VolumeRepRange;
    default:
      return [...IntensityRepRange, ...VolumeRepRange];
  }
}

export const templateName = {
  [WorkoutTemplate.upper_intensity]: "Upper Body (High Intensity)",
  [WorkoutTemplate.upper_volume]: "Upper Body (High Volume)",
  [WorkoutTemplate.lower_intensity]: "Lower Body (High Intensity)",
  [WorkoutTemplate.lower_volume]: "Lower Body (High Volume)",
  [WorkoutTemplate.push]: "Push",
  [WorkoutTemplate.pull]: "Pull",
  [WorkoutTemplate.legs]: "Legs",
  [WorkoutTemplate.custom]: "Custom",
};

export function acceptedExerciseTypesForExercises(template: WorkoutTemplate) {
  switch (template) {
    case WorkoutTemplate.upper_intensity:
    case WorkoutTemplate.upper_volume:
      return [
        ExerciseType.VERTICAL_PRESS,
        ExerciseType.HORIZONTAL_PRESS,
        ExerciseType.UPPER_BACK,
        ExerciseType.ACCESSORY_CHEST,
        ExerciseType.ACCESSORY_SHOULDER,
        ExerciseType.TRAPS,
        ExerciseType.BICEPS,
        ExerciseType.TRICEPS,
        ExerciseType.FOREARMS,
      ];
    case WorkoutTemplate.lower_intensity:
    case WorkoutTemplate.lower_volume:
      return [
        ExerciseType.LEGS_SQUAT,
        ExerciseType.LEGS_DV,
        ExerciseType.ACCESSORY_LEGS,
        ExerciseType.VERTICAL_PULL,
        ExerciseType.ABS,
      ];
    case WorkoutTemplate.push:
      return [ExerciseType.PUSH];
    case WorkoutTemplate.pull:
      return [ExerciseType.PULL];
    case WorkoutTemplate.legs:
      return [ExerciseType.LEGS];
    default:
      return Object.values(ExerciseType);
  }
}

export function formatValue(sets: number, reps: string) {
  return `${sets}:${reps}`;
}

export function intersection(arr1: ExerciseType[], arr2: ExerciseType[]) {
  return arr1.filter((value) => arr2.includes(value)).length !== 0;
}

export function getButtonType(currentView: View, targetView: View) {
  return currentView === targetView ? "link" : "text";
}
