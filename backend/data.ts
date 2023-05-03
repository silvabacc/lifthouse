import { Routines } from "./db";

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

const IntensityRepRange = {
  THREE_BY_THREE: { set: 3, reps: "3" },
  THREE_BY_FIVE: { set: 3, reps: "5" },
  FOUR_BY_FOUR_TO_SIX: { set: 4, reps: "4-6" },
  FIVE_BY_FIVE: { set: 5, reps: "5" },
  FIVE_BY_THREE: { set: 5, reps: "3" },
  FIVE_BY_TWO: { set: 5, reps: "2" },
  FIVE_BY_ONE: { set: 5, reps: "1" },
  THREE_BY_SIX_TO_8: { set: 3, reps: "6-8" },
  THREE_BY_SIX_TO_10: { set: 3, reps: "6-10" },
};

const VolumeRepRange = {
  THREE_BY_EIGHT_TO_TWELVE: { set: 3, reps: "8-12" },
  FIVE_BY_TEN: { set: 5, reps: "10" },
  FIVE_BY_EIGHT: { set: 5, reps: "8" },
  THREE_BY_TWELVE_TO_FIFTEN: { set: 3, reps: "12-15" },
  THREE_BY_TWENTY: { set: 3, reps: "20" },
  FIVE_BY_TWENTY: { set: 5, reps: "20" },
  THREE_BY_THIRTYTHREE: { set: 3, reps: "33" },
  FOUR_BY_TWENTYFIVE: { set: 4, reps: "25" },
  THREE_BY_AMRAP: { set: 3, reps: "AMRAP" },
  SIX_BY_SIX: { set: 6, reps: "6" },
  EIGHT_BY_EIGHT: { set: 6, reps: "8" },
  TEN_BY_TEN: { set: 10, reps: "10" },
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

export interface RepRange {
  sets?: number;
  reps?: string;
}

export interface Exercise extends RepRange {
  name: string;
  type: ExerciseType;
  weight?: number;
}

export const exercises: Exercise[] = [
  {
    name: "Overhead Press with Barbell whilst standing",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Barbell whilst sitting",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Barbell with pins",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Dumbbells with 2h whilst sitting",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Dumbbells with 2h whilst standing",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Dumbbells with 1h whilst standing",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Overhead Press with Dumbbells with 1h whilst sitting",
    type: ExerciseType.VERTICAL_PRESS,
  },
  { name: "Overhead Press with Trap Bar", type: ExerciseType.VERTICAL_PRESS },
  { name: "Z Press Barbell", type: ExerciseType.VERTICAL_PRESS },
  { name: "Z Press with Dumbbells with 2h", type: ExerciseType.VERTICAL_PRESS },
  { name: "Z Press with Dumbbells with 1h", type: ExerciseType.VERTICAL_PRESS },
  {
    name: "Z Press with Landmine press with 1h",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Z Press with Landmine press with 2h",
    type: ExerciseType.VERTICAL_PRESS,
  },
  { name: "Landmine Press with 1h", type: ExerciseType.VERTICAL_PRESS },
  { name: "Landmine Press with 2h", type: ExerciseType.VERTICAL_PRESS },
  {
    name: "Incline Chest Press with Dumbbells at 30 degree",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Incline Chest Press with Dumbbells at 45 degree",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Incline Chest Press with Barbell at 30 degree",
    type: ExerciseType.VERTICAL_PRESS,
  },
  {
    name: "Incline Chest Press with Barbell at 45 degree",
    type: ExerciseType.VERTICAL_PRESS,
  },
  { name: "Incline Chest Press with pins", type: ExerciseType.VERTICAL_PRESS },
  { name: "Bench Press with Barbell", type: ExerciseType.HORIZONTAL_PRESS },
  { name: "Bench Press with Dumbbells", type: ExerciseType.HORIZONTAL_PRESS },
  {
    name: "Bench Press with Dumbbells with a neutral grip",
    type: ExerciseType.HORIZONTAL_PRESS,
  },
  { name: "Dead Bench Press", type: ExerciseType.HORIZONTAL_PRESS },
  { name: "Larson Press with Barbell", type: ExerciseType.HORIZONTAL_PRESS },
  {
    name: "Larson Press with Dumbbells",
    type: ExerciseType.HORIZONTAL_PRESS,
  },
  { name: "Floor Press with Dumbbells", type: ExerciseType.HORIZONTAL_PRESS },
  { name: "Barrell Press", type: ExerciseType.HORIZONTAL_PRESS },
  {
    name: "Barrell Press with no leg drive",
    type: ExerciseType.HORIZONTAL_PRESS,
  },
  { name: "Chest Fly with Dumbbells flat", type: ExerciseType.ACCESSORY_CHEST },
  {
    name: "Chest Fly with Dumbbells at 30 degrees incline",
    type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    name: "Chest Fly with Dumbbells at 45 degrees incline",
    type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    name: "Chest Fly with Cables from the top",
    type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    name: "Chest Fly from with Cables from the middle",
    type: ExerciseType.ACCESSORY_CHEST,
  },
  {
    name: "Chest Fly from with Cables from the bottom",
    type: ExerciseType.ACCESSORY_CHEST,
  },
  { name: "Hammer Press", type: ExerciseType.ACCESSORY_CHEST },
  { name: "Dips", type: ExerciseType.ACCESSORY_CHEST },
  { name: "Row with Barbell", type: ExerciseType.UPPER_BACK },
  { name: "Row with Dumbbells with 1h", type: ExerciseType.UPPER_BACK },
  { name: "Row with Dumbbells with 2h", type: ExerciseType.UPPER_BACK },
  { name: "T-Bar Row", type: ExerciseType.UPPER_BACK },
  { name: "Pendlay Row with Barbell", type: ExerciseType.UPPER_BACK },
  { name: "Pendlay Row with Dumbbell", type: ExerciseType.UPPER_BACK },
  { name: "Pendlay Row with Trap Bar", type: ExerciseType.UPPER_BACK },
  { name: "Meadrow", type: ExerciseType.UPPER_BACK },
  { name: "Chest Supported Row at 30 degrees", type: ExerciseType.UPPER_BACK },
  { name: "Chest Supported Row at 45 degrees", type: ExerciseType.UPPER_BACK },
  { name: "Hammer Row", type: ExerciseType.UPPER_BACK },
  { name: "Pullover with cables", type: ExerciseType.UPPER_BACK },
  { name: "Pullover with Dumbbell", type: ExerciseType.UPPER_BACK },
  { name: "Cable Row with neutral grip", type: ExerciseType.UPPER_BACK },
  { name: "Cable Row with a wide grip", type: ExerciseType.UPPER_BACK },
  { name: "Face Pulls", type: ExerciseType.UPPER_BACK },
  { name: "Shrugs with Barbell", type: ExerciseType.TRAPS },
  { name: "Shrugs with Barbell behind the back", type: ExerciseType.TRAPS },
  { name: "Shrugs with Barbell whilst on knees", type: ExerciseType.TRAPS },
  { name: "Shrugs with Snatch Grip", type: ExerciseType.TRAPS },
  { name: "Shrugs with Zercher Hold", type: ExerciseType.TRAPS },
  { name: "Shrugs with Trap Bar", type: ExerciseType.TRAPS },
  { name: "Shrugs with Dumbbells whilst sitting", type: ExerciseType.TRAPS },
  { name: "Shrugs with Dumbbells whilst standing", type: ExerciseType.TRAPS },
  { name: "Shrugs with Dumbbells whilst on knees", type: ExerciseType.TRAPS },
  { name: "Overhead Shrug with Barbell", type: ExerciseType.TRAPS },
  { name: "Overhead Shrug with Dumbbells with 2h", type: ExerciseType.TRAPS },
  { name: "Overhead Shrug with Dumbbells with 1h", type: ExerciseType.TRAPS },
  { name: "Farmers Walk with Dumbbells", type: ExerciseType.TRAPS },
  { name: "Farmers walk with Trap bar", type: ExerciseType.TRAPS },
  { name: "Incline Front Raise with 30 degrees", type: ExerciseType.TRAPS },
  { name: "Incline Front Raise with 45 degrees", type: ExerciseType.TRAPS },
  {
    name: "Lateral Raise with Dumbbells",
    type: ExerciseType.ACCESSORY_SHOULDER,
  },
  { name: "Lateral Raise with Cables", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "Scarecrow", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "Crufix Holds", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "High Raise", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "Power Raise", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "Lu XIOAJUN Raises", type: ExerciseType.ACCESSORY_SHOULDER },
  { name: "Rear Delt Flyes", type: ExerciseType.ACCESSORY_SHOULDER },
  {
    name: "Rear Delt Flyes with incline at 30 degrees",
    type: ExerciseType.ACCESSORY_SHOULDER,
  },
  {
    name: "Rear Delt Flyes with incline at 45 degrees",
    type: ExerciseType.ACCESSORY_SHOULDER,
  },
  { name: "Reverse Curl with Dumbbells", type: ExerciseType.FOREARMS },
  { name: "Reverse Curl with Ez Bar", type: ExerciseType.FOREARMS },
  { name: "Reverse Preacher Curl with Ez Bar", type: ExerciseType.FOREARMS },
  { name: "Table Curl", type: ExerciseType.FOREARMS },
  { name: "Hand Twisters", type: ExerciseType.FOREARMS },
  { name: "Wrist Rolls", type: ExerciseType.FOREARMS },
  { name: "Bicep Curl with Dumbbells", type: ExerciseType.BICEPS },
  {
    name: "Bicep Curl with Dumbbells on 45 degree incline bench",
    type: ExerciseType.BICEPS,
  },
  { name: "Bicep Curl with Barbell", type: ExerciseType.BICEPS },
  { name: "Bicep Curl with Cables", type: ExerciseType.BICEPS },
  { name: "Hammer Curl with Dumbbells", type: ExerciseType.BICEPS },
  {
    name: "Hammer Curl with Cables with Rope Extension",
    type: ExerciseType.BICEPS,
  },
  { name: "Hammer Curl with Bar", type: ExerciseType.BICEPS },
  { name: "Zotman Curl", type: ExerciseType.BICEPS },
  { name: "Preacher Curl with Ez Bar", type: ExerciseType.BICEPS },
  { name: "Preacher Curl with Dumbbells with 1h", type: ExerciseType.BICEPS },
  {
    name: "Preacher Hammer Curl with Dumbbells with 2h",
    type: ExerciseType.BICEPS,
  },
  {
    name: "Preacher Hammer Curl with Dumbbells with 1h",
    type: ExerciseType.BICEPS,
  },
  { name: "Pinwheel Curl", type: ExerciseType.BICEPS },
  { name: "Spider Curl with Dumbbells", type: ExerciseType.BICEPS },
  { name: "Dead Stop Hammer Concentration Curl", type: ExerciseType.BICEPS },
  { name: "Seated Barbell Curl", type: ExerciseType.BICEPS },
  {
    name: "Skull Crushers with Ez Bar on flat bench",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Skull Crushers with Ez Bar on 30 degree incline bench",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Skull Crushers with Ez Bar on 45 degree incline bench",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Tricep Extensions with Dumbbells on flat bench",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Tricep Extensions with Dumbbells on 30 degree incline",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Tricep Extensions with Cables with bar attachment",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Tate Press on a 45 degrees incline bench",
    type: ExerciseType.TRICEPS,
  },
  { name: "Overhead Tricep Extension with 1h", type: ExerciseType.TRICEPS },
  { name: "Overhead Tricep Extension with 2h", type: ExerciseType.TRICEPS },
  { name: "Overhead Tricep Extension with cables", type: ExerciseType.TRICEPS },
  { name: "Overhead Tricep Extension with Ez Bar", type: ExerciseType.TRICEPS },
  {
    name: "Tricep Extensions with Cable with rope attachment",
    type: ExerciseType.TRICEPS,
  },
  {
    name: "Tricep Extensions Cables with v attachment",
    type: ExerciseType.TRICEPS,
  },
  { name: "Tate Press on a flat bench", type: ExerciseType.TRICEPS },
  {
    name: "Tate Press on a 30 degrees incline bench",
    type: ExerciseType.TRICEPS,
  },
  { name: "Floor Extensions", type: ExerciseType.TRICEPS },
  { name: "Back Squat", type: ExerciseType.LEGS_SQUAT },
  { name: "Back Squat with pins", type: ExerciseType.LEGS_SQUAT },
  { name: "Front Squat", type: ExerciseType.LEGS_SQUAT },
  { name: "Zercher Squat", type: ExerciseType.LEGS_SQUAT },
  { name: "Zercher Squat with pins", type: ExerciseType.LEGS_SQUAT },
  { name: "Zombie Squat", type: ExerciseType.LEGS_SQUAT },
  { name: "Box Squat with 12 inch", type: ExerciseType.LEGS_SQUAT },
  { name: "Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Jefferson Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Hack Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Stiff Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Romanian Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Snatch Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Trap Bar Deadlift", type: ExerciseType.LEGS_DV },
  { name: "Leg Extension with 2L", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Leg Extension with 1L", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Leg Curl with 2L", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Leg Curl with 1L", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Leg Press", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Box Step Up with 18 inch", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Standing Leg Curl", type: ExerciseType.ACCESSORY_LEGS },
  {
    name: "Bulgarian Split Squat with Dumbbells",
    type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    name: "Bulgarian Split Squat with a Zercher hold",
    type: ExerciseType.ACCESSORY_LEGS,
  },
  {
    name: "Bulgarian Split Squat with a Barbell",
    type: ExerciseType.ACCESSORY_LEGS,
  },
  { name: "Lunge with Dumbbells", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Lunge with Zercher hold", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Lunge with Barbell", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Reverse Lunge with Dumbbells", type: ExerciseType.ACCESSORY_LEGS },
  {
    name: "Reverse Lunge with Zercher hold",
    type: ExerciseType.ACCESSORY_LEGS,
  },
  { name: "Reverse Lunge with Barbell", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Glute Bridge", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Hip Thrusts", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Hip Abductors", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Pull through", type: ExerciseType.ACCESSORY_LEGS },
  { name: "Pullup", type: ExerciseType.VERTICAL_PULL },
  { name: "Pullup with neutral grip", type: ExerciseType.VERTICAL_PULL },
  { name: "Pullup with a wide grip", type: ExerciseType.VERTICAL_PULL },
  { name: "Chinup", type: ExerciseType.VERTICAL_PULL },
  { name: "Pulldown with a neutral grip", type: ExerciseType.VERTICAL_PULL },
  { name: "Pulldown with a wide grip", type: ExerciseType.VERTICAL_PULL },
  { name: "Pulldown with narrow grip", type: ExerciseType.VERTICAL_PULL },
  { name: "Sit ups with Plates", type: ExerciseType.ABS },
  { name: "Sit ups with Dumbbell", type: ExerciseType.ABS },
  { name: "Sit ups with a decline bench", type: ExerciseType.ABS },
  { name: "Leg Raises", type: ExerciseType.ABS },
  { name: "Planks", type: ExerciseType.ABS },
  { name: "Cable Crunch", type: ExerciseType.ABS },
  { name: "Pullover Crunch", type: ExerciseType.ABS },
  { name: "Decline Twist", type: ExerciseType.ABS },
];

console.log(exercises.length);

export const defaultRoutines: Routines[] = [
  {
    routine: Routine.UPPER_INTENSITY,
    exercises: [
      {
        name: "Overhead Press with Barbell whilst standing",
        type: ExerciseType.VERTICAL_PRESS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Bench Press with Barbell",
        type: ExerciseType.HORIZONTAL_PRESS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Row with Barbell",
        type: ExerciseType.UPPER_BACK,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Row with Dumbbells with 1h",
        type: ExerciseType.UPPER_BACK,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Lateral Raise with Dumbbells",
        type: ExerciseType.ACCESSORY_SHOULDER,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Spider Curl with Dumbbells",
        type: ExerciseType.BICEPS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Reverse Curl with Dumbbells",
        type: ExerciseType.FOREARMS,
        sets: 3,
        reps: "8-12",
      },
    ],
  },
  {
    routine: Routine.UPPER_VOLUME,
    exercises: [
      {
        name: "Overhead Press with Barbell whilst standing",
        type: ExerciseType.VERTICAL_PRESS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Bench Press with Barbell",
        type: ExerciseType.HORIZONTAL_PRESS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Row with Barbell",
        type: ExerciseType.UPPER_BACK,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Row with Dumbbells with 1h",
        type: ExerciseType.UPPER_BACK,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Shrugs with Barbell",
        type: ExerciseType.TRAPS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Lateral Raise with Dumbbells",
        type: ExerciseType.ACCESSORY_SHOULDER,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Spider Curl with Dumbbells",
        type: ExerciseType.BICEPS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Reverse Curl with Dumbbells",
        type: ExerciseType.FOREARMS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Skull Crushers with Ez Bar on flat bench",
        type: ExerciseType.TRICEPS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Skull Crushers with Ez Bar on 30 degree incline bench",
        type: ExerciseType.TRICEPS,
        sets: 3,
        reps: "8-12",
      },
    ],
  },
  {
    routine: Routine.LOWER_INTENSITY,
    exercises: [
      {
        name: "Back Squat",
        type: ExerciseType.LEGS_SQUAT,
        sets: 3,
        reps: "8-12",
      },
      { name: "Deadlift", type: ExerciseType.LEGS_DV, sets: 3, reps: "8-12" },
      {
        name: "Leg Extension with 2L",
        type: ExerciseType.ACCESSORY_LEGS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Lunge with Zercher hold",
        type: ExerciseType.ACCESSORY_LEGS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Pulldown with a wide grip",
        type: ExerciseType.VERTICAL_PULL,
        sets: 3,
        reps: "8-12",
      },
    ],
  },
  {
    routine: Routine.LOWER_VOLUME,
    exercises: [
      {
        name: "Back Squat",
        type: ExerciseType.LEGS_SQUAT,
        sets: 3,
        reps: "8-12",
      },
      { name: "Deadlift", type: ExerciseType.LEGS_DV, sets: 3, reps: "8-12" },
      {
        name: "Leg Extension with 2L",
        type: ExerciseType.ACCESSORY_LEGS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Lunge with Zercher hold",
        type: ExerciseType.ACCESSORY_LEGS,
        sets: 3,
        reps: "8-12",
      },
      {
        name: "Pulldown with a wide grip",
        type: ExerciseType.VERTICAL_PULL,
        sets: 3,
        reps: "8-12",
      },
    ],
  },
];
