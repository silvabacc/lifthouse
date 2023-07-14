export enum RoutineType {
  UPPER_INTENSITY = "UPPER_INTENSITY",
  UPPER_VOLUME = "UPPER_VOLUME",
  LOWER_INTENSITY = "LOWER_INTENSITY",
  LOWER_VOLUME = "LOWER_VOLUME",
}

export enum ExerciseType {
  VERTICAL_PRESS = "VERTICAL_PRESS",
  HORIZONTAL_PRESS = "HORIZONTAL_PRESS",
  ACCESSORY_CHEST = "ACCESSORY_CHEST",
  ACCESSORY_SHOULDER = "ACCESSORY_SHOULDER",
  UPPER_BACK = "UPPER_BACK",
  TRAPS = "TRAPS",
  FOREARMS = "FOREARMS",
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  LEGS_SQUAT = "LEGS_SQUAT",
  LEGS_DV = "LEGS_DV",
  ACCESSORY_LEGS = "ACCESSORY_LEGS",
  VERTICAL_PULL = "VERTICAL_PULL",
  ABS = "ABS",
}

export interface LogEntries {
  logEntryId: string;
  exerciseId: string;
  set: number;
  reps: string;
  weight: number;
}

export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;
}

export interface Exercises {
  exerciseId: string;
  sets: number;
  reps: string;
}

export interface Routine {
  routineId: string;
  userId: string;
  routinesType: string;
  exercises: Exercises[];
}
