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

export const routineSetup = {
  [Routine.UPPER_INTENSITY]: [
    ExerciseType.VERTICAL_PRESS,
    ExerciseType.HORIZONTAL_PRESS,
    ExerciseType.ACCESSORY_CHEST,
    ExerciseType.UPPER_BACK,
    ExerciseType.UPPER_BACK,
    ExerciseType.ACCESSORY_SHOULDER,
    ExerciseType.BICEPS,
    ExerciseType.FOREARMS,
  ],
  [Routine.UPPER_VOLUME]: [
    ExerciseType.VERTICAL_PRESS,
    ExerciseType.HORIZONTAL_PRESS,
    ExerciseType.UPPER_BACK,
    ExerciseType.UPPER_BACK,
    ExerciseType.TRAPS,
    ExerciseType.ACCESSORY_SHOULDER,
    ExerciseType.TRICEPS,
    ExerciseType.TRICEPS,
    ExerciseType.BICEPS,
    ExerciseType.FOREARMS,
  ],
  [Routine.LOWER_INTENSITY]: [
    ExerciseType.LEGS_SQUAT,
    ExerciseType.LEGS_DV,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.VERTICAL_PULL,
  ],
  [Routine.LOWER_VOLUME]: [
    ExerciseType.LEGS_SQUAT,
    ExerciseType.LEGS_DV,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.VERTICAL_PULL,
  ],
};
