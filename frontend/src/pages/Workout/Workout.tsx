import React from "react";
import { useParams } from "react-router-dom";
import { WorkoutTypes } from "./types";
import { Typography } from "antd";

const { Title } = Typography;

const pageTitleMapping = {
  [WorkoutTypes.UPPER_INTENSITY]: "Upper Intensity",
  [WorkoutTypes.UPPER_VOLUME]: "Upper Volume",
  [WorkoutTypes.LOWER_INTENSITY]: "Lower Intensity",
  [WorkoutTypes.LOWER_VOLUME]: "Lower Volume",
};

const Workout: React.FC = () => {
  const { workoutType } = useParams();

  return <Title>{pageTitleMapping[workoutType]}</Title>;
};

export default Workout;
