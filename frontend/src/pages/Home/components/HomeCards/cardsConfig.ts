import BigZImage from "./images/big_z.png";
import ArnoldImage from "./images/arnold.png";
import EddieImage from "./images/eddie_hall.png";
import TomPlatzImage from "./images/tom_platz.png";
import GrizzlyImage from "./images/grizzly.png";
import MealTrackerImage from "./images/meal_tracker.png";
import MiloImage from "./images/milo.png";
import { RoutineType } from "@backend/types";

const ROUTE = "/routine";

export interface HomeCardConfig {
  title: string;
  image: string;
  route: string;
}

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
  { title: "All Exercises", image: MiloImage, route: "/exercises" },
];

export const dietCards = [
  { title: "Daily Weigh In", image: GrizzlyImage, route: `/weigh-in` },
  { title: "Meal Tracker", image: MealTrackerImage, route: "/meal-tracker" },
];
