import React from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";
import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatzImage from "./components/WorkoutsCard/images/tom_platz.png";
import GrizzlyImage from "./components/WorkoutsCard/images/grizzly.png";
import MealTrackerImage from "./components/WorkoutsCard/images/meal_tracker.png";
import { Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const workoutCards = [
  { title: "Upper Intensity", image: BigZImage },
  { title: "Upper Volume", image: ArnoldImage },
  { title: "Lower Intensity", image: EddieImage },
  { title: "Lower Volume", image: TomPlatzImage },
];

const dietCards = [
  { title: "Daily Weigh In", image: GrizzlyImage },
  { title: "Meal Tracker", image: MealTrackerImage },
];

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <>
      <Title>Time to Grind 💪</Title>
      <Title level={4}>Workouts 🏋</Title>
      {workoutCards.map((card) => (
        <WorkoutsCard
          title={card.title}
          image={card.image}
          onClick={() => navigate("/workout")}
        />
      ))}
      <Title level={4}>Diet 🥑</Title>
      {dietCards.map((card) => (
        <WorkoutsCard
          title={card.title}
          image={card.image}
          onClick={() => navigate("/")}
        />
      ))}
    </>
  );
};

export default Home;
