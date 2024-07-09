import FiveThreeOneCoverImage from "@/app/lifthouse/components/assets/531_cover.png";
import ExerciseCoverImage from "@/app/lifthouse/components/assets/exercises_cover.png";
import MealsCoverImage from "@/app/lifthouse/components/assets/meals_cover.png";
import WeightCoverImage from "@/app/lifthouse/components/assets/weight_cover.png";
import WorkoutsCoverImage from "@/app/lifthouse/components/assets/workouts_cover.png";

const MainRoute = "/lifthouse";

export const pageConfig = [
  {
    title: "Workouts",
    route: `${MainRoute}/workouts`,
    icon: "🏋️",
    description: "Create and manage your workout plans",
    cover: WorkoutsCoverImage,
  },
  {
    title: "Exercises",
    icon: "⛰️",
    route: `${MainRoute}/exercises`,
    description: "View exercises and check your progress",
    cover: ExerciseCoverImage,
  },
  {
    title: "531",
    icon: "🦾",
    route: `${MainRoute}/531`,
    description: "Follow the 531 program and track your progress",
    cover: FiveThreeOneCoverImage,
  },
  {
    title: "Meals",
    icon: "🥑",
    route: `${MainRoute}/meals`,
    description: "Track your meals, calories and macros",
    cover: MealsCoverImage,
  },
  {
    title: "Weight",
    icon: "⚖️",
    route: `${MainRoute}/weight`,
    description:
      "Track your weight and progress on a weeky, monthly and yearly progress",
    cover: WeightCoverImage,
  },
];
