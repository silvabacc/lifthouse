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

export interface RepRange {
  sets: number;
  reps: string;
}

export interface Info {
  set: number;
  reps: number;
  weight: number;
}

//* sets, weighs and reps should map to each other
export interface LogEntry {
  logEntryId?: string;
  exerciseId: string;
  info: Info[];
  date?: Date;
  notes?: string;
}

export interface Exercise {
  exerciseId: string;
  exerciseName: string;
  exerciseType: ExerciseType;
}

export interface RoutineExercise {
  exerciseId: string;
  sets: number;
  reps: string;
}

export interface Routine {
  routineId: string;
  userId: string;
  routinesType: RoutineType;
  exercises: RoutineExercise[];
}

export interface DailyWeighIn {
  weight: number;
  date: Date;
}

export interface Meal {
  id: string;
  mealName: string;
  calories: number;
  protein: number;
  date: Date;
}

export interface ExerciseHistory {
  logEntries: LogEntry[];
  count: number;
}
