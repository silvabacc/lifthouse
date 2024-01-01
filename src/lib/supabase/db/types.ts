type WorkoutExercise = {
  exerciseId: number;
  sets: number;
  reps: string;
};

export type Workout = {
  workoutId: number;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  userId: string;
};

export enum ExerciseType {
  ABS = "ABS",
  ACCESSORY_CHEST = "ACCESSORY_CHEST",
  ACCESSORY_SHOULDERS = "ACCESSORY_SHOULDERS",
  TRICEPS = "TRICEPS",
  BICEPS = "BICEPS",
  FOREARMS = "FOREARMS",
  UPPER_BACK = "UPPER_BACK",
  TRAPS = "TRAPS",
  LEGS_DV = "LEGS_DV",
  LEGS_SQUAT = "LEGS_SQUAT",
  VERTICAL_PUSH = "VERTICAL_PUSH",
  VERTICAL_PULL = "VERTICAL_PULL",
  HORIZONTAL_PUSH = "HORIZONTAL_PUSH",
  PUSH = "PUSH",
  PULL = "PULL",
  LEGS = "LEGS",
}

export enum PrimaryMuscleGroup {
  CORE = "CORE",
  CHEST = "CHEST",
  SHOULDERS = "SHOULDERS",
  TRICEPS = "TRICEPS",
  BICEPS = "BICEPS",
  FOREARMS = "FOREARMS",
  BACK = "BACK",
  LEGS = "LEGS",
}

export type Exercise = {
  exerciseId: number;
  name: string;
  notes?: string;
  exerciseType: ExerciseType[];
  primaryMuscleGroup: PrimaryMuscleGroup;
};
