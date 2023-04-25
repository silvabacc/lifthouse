import Dexie, { Table } from "dexie";
import { Exercise, ExerciseType, exercises as exercisesData } from "./data";

export interface Workouts {
  id?: number;
  workout: Workouts;
  exercises: Exercise[];
  sets: number;
  reps: string;
}

export interface Exercises {
  id?: number;
  name: string;
  type: ExerciseType;
}

export interface LogEntry {
  id?: number;
  exercise: Exercise;
  set: number;
  reps: number;
  weight: number;
}

export class LifthouseDatabase extends Dexie {
  workouts!: Table<Workouts>;
  exercises!: Table<Exercises>;
  logEntry!: Table<LogEntry>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      workouts: "++id, workout, exercises, sets, reps",
      exercises: "++id, name, type",
      logEntry: "++id, exercise, set, reps, weight",
    });

    this.exercises.count().then((value) => {
      if (!value) {
        exercisesData.forEach((exercise) => {
          this.exercises.add({ name: exercise.name, type: exercise.type });
        });
      }
    });
  }
}

export const db = new LifthouseDatabase();
