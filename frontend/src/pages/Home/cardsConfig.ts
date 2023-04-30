import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatzImage from "./components/WorkoutsCard/images/tom_platz.png";
import GrizzlyImage from "./components/WorkoutsCard/images/grizzly.png";
import MealTrackerImage from "./components/WorkoutsCard/images/meal_tracker.png";
import { Routine } from "../../../../backend/data";

const ROUTE = "/routine";

export const workoutCards = [
  {
    title: "Upper Intensity",
    image: BigZImage,
    route: `${ROUTE}/${Routine.UPPER_INTENSITY}`,
  },
  {
    title: "Upper Volume",
    image: ArnoldImage,
    route: `${ROUTE}/${Routine.UPPER_VOLUME}`,
  },
  {
    title: "Lower Intensity",
    image: EddieImage,
    route: `${ROUTE}/${Routine.LOWER_INTENSITY}`,
  },
  {
    title: "Lower Volume",
    image: TomPlatzImage,
    route: `${ROUTE}/${Routine.LOWER_VOLUME}`,
  },
];

export const dietCards = [
  { title: "Daily Weigh In", image: GrizzlyImage },
  { title: "Meal Tracker", image: MealTrackerImage },
];
