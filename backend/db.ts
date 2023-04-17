import Dexie, { Table } from "dexie";
import { Exercise, ExerciseType, exercises as exercisesData } from "./data";

export interface Workouts {
  id?: number;
  workout: Workouts;
  exercises: Exercise[];
}

export interface Exercises {
  id?: number;
  name: string;
  type: ExerciseType;
}

export class LifthouseDatabase extends Dexie {
  workouts!: Table<Workouts>;
  exercises!: Table<Exercises>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      workouts: "++id, workout, exercises",
      exercises: "++id, name, type",
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
