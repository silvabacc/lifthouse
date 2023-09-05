import React, { useEffect } from "react";
import WorkoutsCard from "./components/WorkoutsCard/WorkoutsCard";

import { Col, Row, Typography } from "antd";
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
      <Row gutter={6}>
        {workoutCards.map((card) => (
          <Col xs={24} sm={12} key={card.title}>
            <WorkoutsCard
              title={card.title}
              image={card.image}
              onClick={() => navigate(card.route)}
            />
          </Col>
        ))}
      </Row>
      <Title level={4}>Diet 🥑</Title>
      <Row gutter={6}>
        {dietCards.map((card) => (
          <Col xs={24} sm={12}>
            <WorkoutsCard
              key={card.title}
              title={card.title}
              image={card.image}
              onClick={() => navigate(card.route)}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Home;
