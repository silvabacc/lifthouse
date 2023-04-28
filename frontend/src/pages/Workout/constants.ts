import { ExerciseType, Routine } from "../../../../backend/data";

export const pageTitleMapping = {
  [Routine.UPPER_INTENSITY]: "Upper Intensity",
  [Routine.UPPER_VOLUME]: "Upper Volume",
  [Routine.LOWER_INTENSITY]: "Lower Intensity",
  [Routine.LOWER_VOLUME]: "Lower Volume",
};

export const paramsMapping = {
  ["upperintensity"]: Routine.UPPER_VOLUME,
  ["uppervolume"]: Routine.UPPER_VOLUME,
  ["lowerintensity"]: Routine.LOWER_INTENSITY,
  ["lowervolume"]: Routine.LOWER_VOLUME,
};
