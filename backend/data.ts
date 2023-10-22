import { ExerciseType, RoutineType } from "./types";

export const IntensityRepRange = [
  { sets: 3, reps: "3" },
  { sets: 3, reps: "5" },
  { sets: 4, reps: "4-6" },
  { sets: 5, reps: "5" },
  { sets: 5, reps: "3" },
  { sets: 5, reps: "2" },
  { sets: 5, reps: "1" },
  { sets: 3, reps: "6-8" },
  { sets: 3, reps: "6-10" },
  { sets: 3, reps: "30s-60s" },
];

export const VolumeRepRange = [
  { sets: 3, reps: "8-12" },
  { sets: 5, reps: "10" },
  { sets: 5, reps: "8" },
  { sets: 3, reps: "12-15" },
  { sets: 3, reps: "20" },
  { sets: 5, reps: "20" },
  { sets: 3, reps: "33" },
  { sets: 4, reps: "25" },
  { sets: 3, reps: "AMRAP" },
  { sets: 6, reps: "6" },
  { sets: 6, reps: "8" },
  { sets: 10, reps: "10" },
  { sets: 3, reps: "30s-60s" },
];

// export const IntensityRepRange = {
//   THREE_BY_THREE: { set: 3, reps: "3" },
//   THREE_BY_FIVE: { set: 3, reps: "5" },
//   FOUR_BY_FOUR_TO_SIX: { set: 4, reps: "4-6" },
//   FIVE_BY_FIVE: { set: 5, reps: "5" },
//   FIVE_BY_THREE: { set: 5, reps: "3" },
//   FIVE_BY_TWO: { set: 5, reps: "2" },
//   FIVE_BY_ONE: { set: 5, reps: "1" },
//   THREE_BY_SIX_TO_8: { set: 3, reps: "6-8" },
//   THREE_BY_SIX_TO_10: { set: 3, reps: "6-10" },
// };

// export const VolumeRepRange = {
//   THREE_BY_EIGHT_TO_TWELVE: { set: 3, reps: "8-12" },
//   FIVE_BY_TEN: { set: 5, reps: "10" },
//   FIVE_BY_EIGHT: { set: 5, reps: "8" },
//   THREE_BY_TWELVE_TO_FIFTEN: { set: 3, reps: "12-15" },
//   THREE_BY_TWENTY: { set: 3, reps: "20" },
//   FIVE_BY_TWENTY: { set: 5, reps: "20" },
//   THREE_BY_THIRTYTHREE: { set: 3, reps: "33" },
//   FOUR_BY_TWENTYFIVE: { set: 4, reps: "25" },
//   THREE_BY_AMRAP: { set: 3, reps: "AMRAP" },
//   SIX_BY_SIX: { set: 6, reps: "6" },
//   EIGHT_BY_EIGHT: { set: 6, reps: "8" },
//   TEN_BY_TEN: { set: 10, reps: "10" },
// };

export const routineSetup = {
  [RoutineType.UPPER_INTENSITY]: [
    ExerciseType.VERTICAL_PRESS,
    ExerciseType.HORIZONTAL_PRESS,
    ExerciseType.ACCESSORY_CHEST,
    ExerciseType.UPPER_BACK,
    ExerciseType.UPPER_BACK,
    ExerciseType.ACCESSORY_SHOULDER,
    ExerciseType.BICEPS,
    ExerciseType.FOREARMS,
  ],
  [RoutineType.UPPER_VOLUME]: [
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
  [RoutineType.LOWER_INTENSITY]: [
    ExerciseType.LEGS_SQUAT,
    ExerciseType.LEGS_DV,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.VERTICAL_PULL,
    ExerciseType.ABS,
  ],
  [RoutineType.LOWER_VOLUME]: [
    ExerciseType.LEGS_SQUAT,
    ExerciseType.LEGS_DV,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.ACCESSORY_LEGS,
    ExerciseType.VERTICAL_PULL,
    ExerciseType.ABS,
  ],
};

// export const defaultRoutines = [
//   {
//     routine: Routine.UPPER_INTENSITY,
//     exercises: [
//       {
//         exercise_name: "Overhead Press with Barbell whilst standing",
//         exercise_type: ExerciseType.VERTICAL_PRESS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Bench Press with Barbell",
//         exercise_type: ExerciseType.HORIZONTAL_PRESS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Row with Barbell",
//         exercise_type: ExerciseType.UPPER_BACK,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Row with Dumbbells with 1h",
//         exercise_type: ExerciseType.UPPER_BACK,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Lateral Raise with Dumbbells",
//         exercise_type: ExerciseType.ACCESSORY_SHOULDER,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Spider Curl with Dumbbells",
//         exercise_type: ExerciseType.BICEPS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Reverse Curl with Dumbbells",
//         exercise_type: ExerciseType.FOREARMS,
//         sets: 3,
//         reps: "8-12",
//       },
//     ],
//   },
//   {
//     routine: Routine.UPPER_VOLUME,
//     exercises: [
//       {
//         exercise_name: "Overhead Press with Barbell whilst standing",
//         exercise_type: ExerciseType.VERTICAL_PRESS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Bench Press with Barbell",
//         exercise_type: ExerciseType.HORIZONTAL_PRESS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Row with Barbell",
//         exercise_type: ExerciseType.UPPER_BACK,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Row with Dumbbells with 1h",
//         exercise_type: ExerciseType.UPPER_BACK,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Shrugs with Barbell",
//         exercise_type: ExerciseType.TRAPS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Lateral Raise with Dumbbells",
//         exercise_type: ExerciseType.ACCESSORY_SHOULDER,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Spider Curl with Dumbbells",
//         exercise_type: ExerciseType.BICEPS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Reverse Curl with Dumbbells",
//         exercise_type: ExerciseType.FOREARMS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Skull Crushers with Ez Bar on flat bench",
//         exercise_type: ExerciseType.TRICEPS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Skull Crushers with Ez Bar on 30 degree incline bench",
//         exercise_type: ExerciseType.TRICEPS,
//         sets: 3,
//         reps: "8-12",
//       },
//     ],
//   },
//   {
//     routine: Routine.LOWER_INTENSITY,
//     exercises: [
//       {
//         exercise_name: "Back Squat",
//         exercise_type: ExerciseType.LEGS_SQUAT,
//         sets: 3,
//         reps: "8-12",
//       },
//       { exercise_name: "Deadlift", exercise_type: ExerciseType.LEGS_DV, sets: 3, reps: "8-12" },
//       {
//         exercise_name: "Leg Extension with 2L",
//         exercise_type: ExerciseType.ACCESSORY_LEGS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Lunge with Zercher hold",
//         exercise_type: ExerciseType.ACCESSORY_LEGS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Pulldown with a wide grip",
//         exercise_type: ExerciseType.VERTICAL_PULL,
//         sets: 3,
//         reps: "8-12",
//       },
//     ],
//   },
//   {
//     routine: Routine.LOWER_VOLUME,
//     exercises: [
//       {
//         exercise_name: "Back Squat",
//         exercise_type: ExerciseType.LEGS_SQUAT,
//         sets: 3,
//         reps: "8-12",
//       },
//       { exercise_name: "Deadlift", exercise_type: ExerciseType.LEGS_DV, sets: 3, reps: "8-12" },
//       {
//         exercise_name: "Leg Extension with 2L",
//         exercise_type: ExerciseType.ACCESSORY_LEGS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Lunge with Zercher hold",
//         exercise_type: ExerciseType.ACCESSORY_LEGS,
//         sets: 3,
//         reps: "8-12",
//       },
//       {
//         exercise_name: "Pulldown with a wide grip",
//         exercise_type: ExerciseType.VERTICAL_PULL,
//         sets: 3,
//         reps: "8-12",
//       },
//     ],
//   },
// ];
