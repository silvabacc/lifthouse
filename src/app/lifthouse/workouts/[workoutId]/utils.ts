import { ExerciseType, WorkoutTemplate } from "@/lib/supabase/db/types";

export const IntensityRepRange = [
  { sets: 3, reps: "3" },
  { sets: 3, reps: "5" },
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
  { sets: 3, reps: "15s" },
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

export const templateName = {
  [WorkoutTemplate.upper_intensity]: "Upper Body (High Intensity)",
  [WorkoutTemplate.upper_volume]: "Upper Body (High Volume)",
  [WorkoutTemplate.lower_intensity]: "Lower Body (High Intensity",
  [WorkoutTemplate.lower_volume]: "Lower Body (High Volume)",
  [WorkoutTemplate.push]: "Push",
  [WorkoutTemplate.pull]: "Pull",
  [WorkoutTemplate.legs]: "Legs",
  [WorkoutTemplate.custom]: "Custom",
};
export const defaultExercisesForTemplates = {
  [WorkoutTemplate.upper_intensity]: {
    exercises: [
      { exerciseId: 2, sets: 3, reps: "5" },
      { type: ExerciseType.HORIZONTAL_PRESS, sets: 3, reps: "5" },
      { type: ExerciseType.ACCESSORY_CHEST, sets: 3, reps: "6-10" },
      { type: ExerciseType.UPPER_BACK, sets: 3, reps: "6-10" },
      { type: ExerciseType.UPPER_BACK, sets: 3, reps: "6-10" },
      { type: ExerciseType.ACCESSORY_SHOULDER, sets: 3, reps: "6-10" },
      {
        type: [ExerciseType.BICEPS, ExerciseType.FOREARMS],
        sets: 3,
        reps: "6-10",
      },
      {
        type: [ExerciseType.BICEPS, ExerciseType.FOREARMS],
        sets: 3,
        reps: "6-10",
      },
    ],
  },
  [WorkoutTemplate.upper_volume]: {
    exercises: [
      { type: ExerciseType.VERTICAL_PRESS, sets: 5, reps: "10" },
      { type: ExerciseType.HORIZONTAL_PRESS, sets: 5, reps: "10" },
      { type: ExerciseType.ACCESSORY_CHEST, sets: 3, reps: "8-12" },
      { type: ExerciseType.UPPER_BACK, sets: 3, reps: "8-12" },
      { type: ExerciseType.UPPER_BACK, sets: 3, reps: "8-12" },
      { type: ExerciseType.ACCESSORY_SHOULDER, sets: 3, reps: "8-12" },
      {
        type: [ExerciseType.BICEPS, ExerciseType.FOREARMS],
        sets: 3,
        reps: "8-12",
      },
      {
        type: [ExerciseType.BICEPS, ExerciseType.FOREARMS],
        sets: 3,
        reps: "8-12",
      },
    ],
  },
  [WorkoutTemplate.lower_intensity]: {
    exercises: [
      { type: ExerciseType.LEGS_SQUAT, sets: 3, reps: "5" },
      { type: ExerciseType.LEGS_DV, reps: "5" },
      { type: ExerciseType.LEGS_ACCESSORY, reps: "6-10" },
      { type: ExerciseType.LEGS_ACCESSORY, reps: "6-10" },
      { type: ExerciseType.VERTICAL_PULL, reps: "6-10" },
      { type: ExerciseType.ABS, reps: "6-10" },
    ],
  },
  [WorkoutTemplate.lower_volume]: {
    exercises: [
      { type: ExerciseType.LEGS_SQUAT, sets: 5, reps: "10" },
      { type: ExerciseType.LEGS_DV, sets: 5, reps: "10" },
      { type: ExerciseType.LEGS_ACCESSORY, sets: 3, reps: "8-12" },
      { type: ExerciseType.LEGS_ACCESSORY, sets: 3, reps: "8-12" },
      { type: ExerciseType.VERTICAL_PULL, sets: 3, reps: "8-12" },
      { type: ExerciseType.ABS, sets: 3, reps: "8-12" },
    ],
  },
};
