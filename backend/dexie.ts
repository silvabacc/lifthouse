import Dexie, { Table } from "dexie";

interface Info {
  set: number;
  reps: number;
  weight: number;
}

//* sets, weighs and reps should map to each other
export interface LogEntryStorage {
  exerciseId: string;
  info: Info[];
}

export class LocalStorageDb extends Dexie {
  logEntryStorage!: Table<LogEntryStorage>;

  constructor() {
    super("lifthousedatabase");
    this.version(1).stores({
      logEntryStorage: "++exerciseId, info",
    });
  }

  async getTemporaryStorage(exerciseId: string) {
    return await this.logEntryStorage.get(exerciseId);
  }

  async writeTemporaryStorage(
    exerciseId: string,
    set: number,
    reps: number,
    weight: number
  ) {
    const current = await this.logEntryStorage.get(exerciseId);

    if (current) {
      await this.logEntryStorage.update(exerciseId, {
        exerciseId,
        info: [
          //Removes duplicated sets
          ...current.info.filter((info) => info.set !== set),
          { set, reps, weight },
        ],
      });
      return;
    }

    await this.logEntryStorage.add({
      exerciseId,
      info: [{ set, reps, weight }],
    });
  }

  async removeSetFromExercise(exerciseId: string, set: number) {
    const current = await this.logEntryStorage.get(exerciseId);

    if (current) {
      await this.logEntryStorage.update(exerciseId, {
        exerciseId,
        info: [...current.info.filter((info) => info.set !== set)],
      });
      return;
    }
  }

  clearTemporaryStorage() {
    this.logEntryStorage.clear();
  }
}

export const db = new LocalStorageDb();
