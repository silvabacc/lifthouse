import React from "react";
import { Text } from "react-native";
import { textStyle } from "../../style/House.style";
import TodayCard from "./components/TodayCard";
import style from "./Home.style";

const Home: React.FC = () => {
  return (
    <>
      <Text style={textStyle.h1}>Time to Grind 💪</Text>
      <TodayCard />
      <Text style={[textStyle.h2, style.subTitle]}>Workouts 🏋️</Text>
    </>
  );
};

export default Home;
