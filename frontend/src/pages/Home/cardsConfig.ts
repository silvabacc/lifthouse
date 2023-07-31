import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatzImage from "./components/WorkoutsCard/images/tom_platz.png";
import GrizzlyImage from "./components/WorkoutsCard/images/grizzly.png";
import MealTrackerImage from "./components/WorkoutsCard/images/meal_tracker.png";
import { RoutineType } from "@backend/types";

const ROUTE = "/routine";

export const workoutCards = [
  {
    title: "Upper Intensity",
    image: BigZImage,
    route: `${ROUTE}/${RoutineType.UPPER_INTENSITY}`,
  },
  {
    title: "Upper Volume",
    image: ArnoldImage,
    route: `${ROUTE}/${RoutineType.UPPER_VOLUME}`,
  },
  {
    title: "Lower Intensity",
    image: EddieImage,
    route: `${ROUTE}/${RoutineType.LOWER_INTENSITY}`,
  },
  {
    title: "Lower Volume",
    image: TomPlatzImage,
    route: `${ROUTE}/${RoutineType.LOWER_VOLUME}`,
  },
];

export const dietCards = [
  { title: "Daily Weigh In", image: GrizzlyImage, route: `/weigh-in` },
  { title: "Meal Tracker", image: MealTrackerImage, route: "/meal-tracker" },
];
