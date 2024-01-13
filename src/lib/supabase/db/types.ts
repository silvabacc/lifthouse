export type WorkoutExercise = {
  exerciseId: number;
  sets: number;
  reps: string;
};

export type Workout = {
  workoutId: number;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  template: WorkoutTemplate;
};

export type TemplateSetup = {
  setupId: number;
  template: WorkoutTemplate;
  exercises: WorkoutExercise[];
};

export type LogInfo = {
  set: number;
  reps: number;
  weight: number;
};

export type LogEntry = {
  logId: number;
  exerciseId: number;
  info: LogInfo[];
  date: Date;
  notes: string;
};

export type Exercise = {
  exerciseId: number;
  name: string;
  notes?: string;
  exerciseType: ExerciseType[];
  primaryMuscleGroup: PrimaryMuscleGroup;
  youtubeId?: string;
};

export enum WorkoutTemplate {
  upper_intensity = "upper_intensity",
  upper_volume = "upper_volume",
  lower_intensity = "lower_intensity",
  lower_volume = "lower_volume",

  push = "push",
  pull = "pull",
  legs = "legs",

  custom = "custom",
}

export enum ExerciseType {
  ABS = "ABS",
  ACCESSORY_CHEST = "ACCESSORY_CHEST",
  ACCESSORY_SHOULDER = "ACCESSORY_SHOULDER",
  TRICEPS = "TRICEPS",
  BICEPS = "BICEPS",
  FOREARMS = "FOREARMS",
  UPPER_BACK = "UPPER_BACK",
  TRAPS = "TRAPS",
  LEGS_DV = "LEGS_DV",
  LEGS_ACCESSORY = "LEGS_ACCESSORY",
  LEGS_SQUAT = "LEGS_SQUAT",
  VERTICAL_PRESS = "VERTICAL_PRESS",
  VERTICAL_PULL = "VERTICAL_PULL",
  HORIZONTAL_PRESS = "HORIZONTAL_PRESS",
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
