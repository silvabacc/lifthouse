import React, { useEffect } from "react";

import { Typography } from "antd";
import { useLocation } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";
import { HomeCards } from "./components/HomeCards/HomeCards";
import { dietCards, workoutCards } from "./components/HomeCards/cardsConfig";

const { Title } = Typography;

const Home: React.FC = () => {
  const [messageApi, contextHolder] = useMessage();
  const { state } = useLocation();

  useEffect(() => {
    if (state?.passwordUpdated) {
      window.history.replaceState({}, document.title);
      messageApi.success("Password updated successfully!");
    }
  }, [state]);

  return (
    <>
      {contextHolder}
      <Title level={4}>Workouts 🏋</Title>
      <HomeCards cardConfig={workoutCards} />
      <Title level={4}>Diet 🥑</Title>
      <HomeCards cardConfig={dietCards} />
    </>
  );
};

export default Home;
