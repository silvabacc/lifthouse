export enum Routine {
  UPPER_INTENSITY = "UPPER_INTENSITY",
  UPPER_VOLUME = "UPPER_VOLUME",
  LOWER_INTENSITY = "LOWER_INTENSITY",
  LOWER_VOLUME = "LOWER_VOLUME",
}

export enum ExerciseType {
  VERTICAL_PRESS = "VERTICAL_PRESS",
  HORIZONTAL_PRESS = "HORIZONTAL_PRESS",
  ACCESSORY_CHEST = "ACCESSORY_CHEST",
  ACCESSORY_SHOULDER = "ACCESSORY_SHOULDER",
  UPPER_BACK = "UPPER_BACK",
  TRAPS = "TRAPS",
  FOREARMS = "FOREARMS",
  BICEPS = "BICEPS",
  TRICEPS = "TRICEPS",
  LEGS_SQUAT = "LEGS_SQUAT",
  LEGS_DV = "LEGS_DV",
  ACCESSORY_LEGS = "ACCESSORY_LEGS",
  VERTICAL_PULL = "VERTICAL_PULL",
  ABS = "ABS",
}

export const IntensityRepRange: RepRange[] = [
  { sets: 3, reps: "3" },
  { sets: 3, reps: "5" },
  { sets: 4, reps: "4-6" },
  { sets: 5, reps: "5" },
  { sets: 5, reps: "3" },
  { sets: 5, reps: "2" },
  { sets: 5, reps: "1" },
  { sets: 3, reps: "6-8" },
  { sets: 3, reps: "6-10" },
];

export const VolumeRepRange: RepRange[] = [
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

export interface RepRange {
  sets?: number;
  reps?: string;
}

export interface Exercise extends RepRange {
  exercise_name: string;
  exercise_type: ExerciseType;
  weight?: number;
}

export const exercises: Exercise[] = [
  {
    exercise_name: "Overhead Press with Barbell whilst standing",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Barbell whilst sitting",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Barbell with pins",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Dumbbells with 2h whilst sitting",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Dumbbells with 2h whilst standing",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Dumbbells with 1h whilst standing",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Dumbbells with 1h whilst sitting",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Overhead Press with Trap Bar",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Z Press Barbell",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Z Press with Dumbbells with 2h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Z Press with Dumbbells with 1h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Z Press with Landmine press with 1h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Z Press with Landmine press with 2h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Landmine Press with 1h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Landmine Press with 2h",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Incline Chest Press with Dumbbells at 30 degree",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Incline Chest Press with Dumbbells at 45 degree",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Incline Chest Press with Barbell at 30 degree",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Incline Chest Press with Barbell at 45 degree",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Incline Chest Press with pins",
    exercise_type: ExerciseType.VERTICAL_PRESS,
  },
  {
    exercise_name: "Bench Press with Barbell",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Bench Press with Dumbbells",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Bench Press with Dumbbells with a neutral grip",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Dead Bench Press",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Larson Press with Barbell",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Larson Press with Dumbbells",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Floor Press with Dumbbells",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Barrell Press",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Barrell Press with no leg drive",
    exercise_type: ExerciseType.HORIZONTAL_PRESS,
  },
  {
    exercise_name: "Chest Fly with Dumbbells flat",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Chest Fly with Dumbbells at 30 degrees incline",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Chest Fly with Dumbbells at 45 degrees incline",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Chest Fly with Cables from the top",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Chest Fly from with Cables from the middle",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Chest Fly from with Cables from the bottom",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Hammer Press",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Dips",
    exercise_type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    exercise_name: "Row with Barbell",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Row with Dumbbells with 1h",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Row with Dumbbells with 2h",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "T-Bar Row",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Pendlay Row with Barbell",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Pendlay Row with Dumbbell",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Pendlay Row with Trap Bar",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  { exercise_name: "Meadrow", exercise_type: ExerciseType.UPPER_BACK },
  {
    exercise_name: "Chest Supported Row at 30 degrees",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Chest Supported Row at 45 degrees",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Hammer Row",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Pullover with cables",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Pullover with Dumbbell",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Cable Row with neutral grip",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Cable Row with a wide grip",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Face Pulls",
    exercise_type: ExerciseType.UPPER_BACK,
  },
  {
    exercise_name: "Shrugs with Barbell",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Barbell behind the back",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Barbell whilst on knees",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Snatch Grip",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Zercher Hold",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Trap Bar",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Dumbbells whilst sitting",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Dumbbells whilst standing",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Shrugs with Dumbbells whilst on knees",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Overhead Shrug with Barbell",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Overhead Shrug with Dumbbells with 2h",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Overhead Shrug with Dumbbells with 1h",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Farmers Walk with Dumbbells",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Farmers walk with Trap bar",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Incline Front Raise with 30 degrees",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Incline Front Raise with 45 degrees",
    exercise_type: ExerciseType.TRAPS,
  },
  {
    exercise_name: "Lateral Raise with Dumbbells",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Lateral Raise with Cables",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Scarecrow",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Crufix Holds",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "High Raise",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Power Raise",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Lu XIOAJUN Raises",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Rear Delt Flyes",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Rear Delt Flyes with incline at 30 degrees",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Rear Delt Flyes with incline at 45 degrees",
    exercise_type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    exercise_name: "Reverse Curl with Dumbbells",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Reverse Curl with Ez Bar",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Reverse Preacher Curl with Ez Bar",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Table Curl",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Hand Twisters",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Wrist Rolls",
    exercise_type: ExerciseType.FOREARMS,
  },
  {
    exercise_name: "Bicep Curl with Dumbbells",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Bicep Curl with Dumbbells on 45 degree incline bench",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Bicep Curl with Barbell",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Bicep Curl with Cables",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Hammer Curl with Dumbbells",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Hammer Curl with Cables with Rope Extension",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Hammer Curl with Bar",
    exercise_type: ExerciseType.BICEPS,
  },
  { exercise_name: "Zotman Curl", exercise_type: ExerciseType.BICEPS },
  {
    exercise_name: "Preacher Curl with Ez Bar",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Preacher Curl with Dumbbells with 1h",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Preacher Hammer Curl with Dumbbells with 2h",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Preacher Hammer Curl with Dumbbells with 1h",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Pinwheel Curl",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Spider Curl with Dumbbells",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Dead Stop Hammer Concentration Curl",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Seated Barbell Curl",
    exercise_type: ExerciseType.BICEPS,
  },
  {
    exercise_name: "Skull Crushers with Ez Bar on flat bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Skull Crushers with Ez Bar on 30 degree incline bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Skull Crushers with Ez Bar on 45 degree incline bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tricep Extensions with Dumbbells on flat bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tricep Extensions with Dumbbells on 30 degree incline",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tricep Extensions with Cables with bar attachment",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tate Press on a 45 degrees incline bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Overhead Tricep Extension with 1h",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Overhead Tricep Extension with 2h",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Overhead Tricep Extension with cables",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Overhead Tricep Extension with Ez Bar",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tricep Extensions with Cable with rope attachment",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tricep Extensions Cables with v attachment",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tate Press on a flat bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Tate Press on a 30 degrees incline bench",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Floor Extensions",
    exercise_type: ExerciseType.TRICEPS,
  },
  {
    exercise_name: "Back Squat",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Back Squat with pins",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Front Squat",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Zercher Squat",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Zercher Squat with pins",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Zombie Squat",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  {
    exercise_name: "Box Squat with 12 inch",
    exercise_type: ExerciseType.LEGS_SQUAT,
  },
  { exercise_name: "Deadlift", exercise_type: ExerciseType.LEGS_DV },
  {
    exercise_name: "Jefferson Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Hack Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Stiff Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Romanian Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Snatch Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Trap Bar Deadlift",
    exercise_type: ExerciseType.LEGS_DV,
  },
  {
    exercise_name: "Leg Extension with 2L",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Leg Extension with 1L",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Leg Curl with 2L",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Leg Curl with 1L",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Leg Press",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Box Step Up with 18 inch",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Standing Leg Curl",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Bulgarian Split Squat with Dumbbells",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Bulgarian Split Squat with a Zercher hold",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Bulgarian Split Squat with a Barbell",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Lunge with Dumbbells",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Lunge with Zercher hold",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Lunge with Barbell",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Reverse Lunge with Dumbbells",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Reverse Lunge with Zercher hold",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Reverse Lunge with Barbell",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Glute Bridge",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Hip Thrusts",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Hip Abductors",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Pull through",
    exercise_type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    exercise_name: "Pullup",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Pullup with neutral grip",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Pullup with a wide grip",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Chinup",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Pulldown with a neutral grip",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Pulldown with a wide grip",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Pulldown with narrow grip",
    exercise_type: ExerciseType.VERTICAL_PULL,
  },
  {
    exercise_name: "Sit ups with Plates",
    exercise_type: ExerciseType.ABS,
  },
  {
    exercise_name: "Sit ups with Dumbbell",
    exercise_type: ExerciseType.ABS,
  },
  {
    exercise_name: "Sit ups with a decline bench",
    exercise_type: ExerciseType.ABS,
  },
  { exercise_name: "Leg Raises", exercise_type: ExerciseType.ABS },
  { exercise_name: "Planks", exercise_type: ExerciseType.ABS },
  { exercise_name: "Cable Crunch", exercise_type: ExerciseType.ABS },
  {
    exercise_name: "Pullover Crunch",
    exercise_type: ExerciseType.ABS,
  },
  { exercise_name: "Decline Twist", exercise_type: ExerciseType.ABS },
];

// export const defaultRoutines: Routines[] = [
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
