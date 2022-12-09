import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../style/colors";
import { textStyle } from "../../style/House.style";
import TodayCard from "./components/TodayCard";
import style from "./Home.style";

const Home: React.FC = () => {
  return (
    <>
      <Text style={textStyle.h1}>Time to Grind 💪</Text>
      <TodayCard />
      <View style={style.subTitle}>
        <Text style={textStyle.h2}>Workouts 🏋️</Text>
        <Button
          icon="plus"
          textColor={colors.accent}
          uppercase={true}
          labelStyle={style.add_exercise_button}
          mode="text"
        >
          Add Exercise
        </Button>
      </View>
    </>
  );
};

export default Home;
