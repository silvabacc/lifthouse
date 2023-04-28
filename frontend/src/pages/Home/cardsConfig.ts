import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatzImage from "./components/WorkoutsCard/images/tom_platz.png";
import GrizzlyImage from "./components/WorkoutsCard/images/grizzly.png";
import MealTrackerImage from "./components/WorkoutsCard/images/meal_tracker.png";

const ROUTE = "/routine";

export const workoutCards = [
  {
    title: "Upper Intensity",
    image: BigZImage,
    route: `${ROUTE}/upperintensity`,
  },
  {
    title: "Upper Volume",
    image: ArnoldImage,
    route: `${ROUTE}/uppervolume`,
  },
  {
    title: "Lower Intensity",
    image: EddieImage,
    route: `${ROUTE}/lowerintensity`,
  },
  {
    title: "Lower Volume",
    image: TomPlatzImage,
    route: `${ROUTE}/lowervolume`,
  },
];

export const dietCards = [
  { title: "Daily Weigh In", image: GrizzlyImage },
  { title: "Meal Tracker", image: MealTrackerImage },
];
