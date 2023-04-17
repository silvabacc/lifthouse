import React from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";

import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { dietCards, workoutCards } from "./cardsConfig";

const { Title } = Typography;

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
          onClick={() => navigate(card.route)}
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
