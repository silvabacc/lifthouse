import Dexie, { Table } from "dexie";
import { Info, LogEntry } from "./types";

export class LocalStorageDb extends Dexie {
  logEntryStorage!: Table<LogEntry>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      logEntryStorage: "++exerciseId, info",
    });
  }

  async getTemporaryStorage(exerciseId: string) {
    return await this.logEntryStorage.get(exerciseId);
  }

  async writeTemporaryStorage(exerciseId: string, info?: Info, notes?: string) {
    const current = await this.logEntryStorage.get(exerciseId);

    if (current && info) {
      const { set, reps, weight } = info;

      await this.logEntryStorage.update(exerciseId, {
        info: [
          //Removes duplicated sets
          ...current.info.filter((info) => info.set !== set),
          { set, reps, weight },
        ],
      });
      return;
    }

    if (current && notes) {
      await this.logEntryStorage.update(exerciseId, {
        notes,
      });
      return;
    }

    await this.logEntryStorage.add({
      exerciseId,
      info: info ? [info] : [],
      notes: notes,
    });
  }

  async removeSetFromExercise(exerciseId: string, set: number) {
    const current = await this.logEntryStorage.get(exerciseId);

    if (current) {
      await this.logEntryStorage.update(exerciseId, {
        info: [...current.info.filter((info) => info.set !== set)],
      });
      return;
    }
  }

  clearTemporaryStorageForExercise(exerciseId: string) {
    this.logEntryStorage.delete(exerciseId);
  }

  clearTemporaryStorage() {
    this.logEntryStorage.clear();
  }
}

export const db = new LocalStorageDb();
