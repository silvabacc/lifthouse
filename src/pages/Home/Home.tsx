import React from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";
import BigZImage from "./components/WorkoutsCard/images/big_z.png";
import ArnoldImage from "./components/WorkoutsCard/images/arnold.png";
import EddieImage from "./components/WorkoutsCard/images/eddie_hall.png";
import TomPlatzImage from "./components/WorkoutsCard/images/tom_platz.png";
import GrizzlyImage from "./components/WorkoutsCard/images/grizzly.png";
import MealTrackerImage from "./components/WorkoutsCard/images/meal_tracker.png";
import { Typography } from "antd";

const { Title } = Typography;

const Home: React.FC = () => {
  return (
    <>
      <Title>Time to Grind 💪</Title>
      <Title level={4}>Workouts 🏋</Title>
      <WorkoutsCard image={ArnoldImage} title="Upper Volume" />
      <WorkoutsCard image={EddieImage} title="Lower Intensity" />
      <WorkoutsCard image={TomPlatzImage} title="Lower Volume" />
      <Title level={4}>Diet 🥑</Title>
      <WorkoutsCard image={GrizzlyImage} title="Daily Weigh In" />
      <WorkoutsCard image={MealTrackerImage} title="Meal Tracker" />
    </>
  );
};

export default Home;
