import React from "react";
import { Text } from "react-native";
import { textStyle } from "../../style/House.style";
// import TodayCard from "./components/TodayCard";

const Home: React.FC = () => {
  return (
    <>
      <Text style={textStyle.h1}>Time to Grind 💪</Text>
      {/* <TodayCard /> */}
    </>
  );
};

export default Home;
