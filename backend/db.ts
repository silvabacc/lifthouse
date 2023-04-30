import Dexie, { Table } from "dexie";
import {
  Exercise,
  ExerciseType,
  Routine,
  exercises,
  exercises as exercisesData,
  routineSetup,
} from "./data";

export interface Routines {
  id?: number;
  routine: Routine;
  exercises: Exercise[];
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
  reps: string;
  weight: number;
}

export interface TemporaryStorage {
  id?: number;
  exercise: Exercise;
  routine: Routine;
  set: number;
  reps: string;
  weight: number;
}

export class LifthouseDatabase extends Dexie {
  routines!: Table<Routines>;
  exercises!: Table<Exercises>;
  logEntry!: Table<LogEntry>;
  temporaryStorage!: Table<TemporaryStorage>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      routines: "++id, routine, exercises",
      exercises: "++id, name, type",
      logEntry: "++id, exercise, set, reps, weight",
      temporaryStorage: "++id, exercise.name, routine, set, reps, weight",
    });

    this.exercises.count().then((value) => {
      if (!value) {
        exercisesData.forEach((exercise) => {
          this.exercises.add({ name: exercise.name, type: exercise.type });
        });
      }
    });

    this.routines.count().then((value) => {
      if (!value) {
        Object.values(Routine).forEach((routine) => {
          this.routines.add({
            routine,
            exercises: routineSetup[routine].map((setup) => ({
              ...exercises.find((exercise) => setup === exercise.type)!,
              sets: 3,
              reps: "8-12",
            })),
          });
        });
      }
    });
  }

  getRoutine(routine: Routine) {
    return this.routines.where("routine").equals(routine).toArray();
  }

  async getTemporaryStorage(routine: Routine) {
    return await this.temporaryStorage
      .where("routine")
      .equals(routine)
      .reverse()
      .toArray();
  }

  writeTemporaryStorage(
    exercise: Exercise,
    routine: Routine,
    set: number,
    weight: number,
    reps: string
  ) {
    this.temporaryStorage.add({ exercise, routine, set, weight, reps });
  }

  clearTemporaryStorage() {
    this.temporaryStorage.clear();
  }
}

export const db = new LifthouseDatabase();
