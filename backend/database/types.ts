export enum TableNames {
  routines = "routines",
  exercises = "exercises",
  log_entries = "log_entries",
}

export interface RoutineORM {
  routine_id: string;
  user_id: string;
  routine_type: string;
  exercises: {
    exercise_id: string;
    sets: number;
    reps: string;
  }[];
}

export enum RoutinesColumns {
  routine_id = "routine_id",
  user_id = "user_id",
  routine_type = "routine_type",
  exercises = "exercises",
}

export enum ExerciseColumns {
  exercise_id = "exercise_id",
  exercise_type = "exercise_type",
  exercise_name = "exercise_name",
}

export enum LogEntriesColumns {
  log_entries_id = "log_entries_id",
  exercise_id = "exercise_id",
  user_id = "user_id",
  sets = "sets",
  reps = "reps",
  weight = "weight",
}
