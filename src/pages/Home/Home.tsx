import React from "react";
import { Text, View } from "react-native";
import { Button } from "react-native-paper";
import { colors } from "../../style/colors";
import { textStyle } from "../../style/House.style";
import GridCard from "./components/GridCard";
import TodayCard from "./components/TodayCard";
import style from "./Home.style";
import UpperIntensityImage from "../../assets/cardImages/upper_intensity.png";
import UpperVolumeImage from "../../assets/cardImages/upper_volume.png";
import LowerIntensityImage from "../../assets/cardImages/lower_intensity.png";
import LowerVolumeImage from "../../assets/cardImages/lower_volume.png";
import DailyWeighInImage from "../../assets/cardImages/daily_weigh_in.png";
import MealTrackerImage from "../../assets/cardImages/meal_tracker.png";

const Home: React.FC = () => {
  const workoutCards = [
    { title: "Upper Intensity", image: UpperIntensityImage },
    { title: "Upper Volume", image: UpperVolumeImage },
    { title: "Lower Intensity", image: LowerIntensityImage },
    { title: "Lower Volume", image: LowerVolumeImage },
  ];

  const dietCards = [
    { title: "Daily Weight In", image: DailyWeighInImage },
    { title: "Meal Tracker", image: MealTrackerImage },
  ];

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
      <GridCard cards={workoutCards} />
      <View style={style.subTitle}>
        <Text style={textStyle.h2}>Diet 🥑</Text>
      </View>
      <GridCard cards={dietCards} colorsSlice={[5, 7]} />
    </>
  );
};

export default Home;
