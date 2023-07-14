import React from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";

import { Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { dietCards, workoutCards } from "./cardsConfig";
import SettingMenu from "./components/WorkoutsCard/SettingMenu";
import { HeaderContainer } from "./HomeStyles";

const { Title } = Typography;

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderContainer>
        <Title>Time to Grind 💪</Title>
        <SettingMenu />
      </HeaderContainer>
      <Title level={4}>Workouts 🏋</Title>
      {workoutCards.map((card) => (
        <WorkoutsCard
          key={card.title}
          title={card.title}
          image={card.image}
          onClick={() => navigate(card.route)}
        />
      ))}
      <Title level={4}>Diet 🥑</Title>
      {dietCards.map((card) => (
        <WorkoutsCard
          key={card.title}
          title={card.title}
          image={card.image}
          onClick={() => navigate("/home")}
        />
      ))}
    </>
  );
};

export default Home;
