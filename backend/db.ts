import Dexie from "dexie";

export interface Workout {
  id?: number;
  name: string;
  exercises: number;
}

export const db = new Dexie("lifthousedatabase");
db.version(1).stores({
  friends: "++id, name, age", // Primary key and indexed props
});
