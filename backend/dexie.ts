import Dexie, { Table } from "dexie";
import { Exercise, Routine } from "./data";

export interface TemporaryStorage {
  id?: number;
  exercise: Exercise;
  routine: Routine;
  set: number;
  reps: string;
  weight: number;
}

export class LocalStorageDb extends Dexie {
  temporaryStorage!: Table<TemporaryStorage>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      temporaryStorage: "++id, exercise.name, routine, set, reps, weight",
    });
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

export const db = new LocalStorageDb();
