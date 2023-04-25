import React from "react";
import { useParams } from "react-router-dom";
import { WorkoutTypes } from "./types";
import { Collapse, Tabs, TabsProps, Typography } from "antd";
const { Panel } = Collapse;

import "../../../../backend/db";
import SetsReps from "./SetsReps";

const { Title } = Typography;

const pageTitleMapping = {
  [WorkoutTypes.UPPER_INTENSITY]: "Upper Intensity",
  [WorkoutTypes.UPPER_VOLUME]: "Upper Volume",
  [WorkoutTypes.LOWER_INTENSITY]: "Lower Intensity",
  [WorkoutTypes.LOWER_VOLUME]: "Lower Volume",
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `Sets & Reps`,
    children: <SetsReps />,
  },
  {
    key: "2",
    label: `History`,
    children: `History`,
  },
];

const Workout: React.FC = () => {
  const { workoutType } = useParams();

  return (
    <>
      <Title>{pageTitleMapping[workoutType]}</Title>
      <Collapse size="large">
        <Panel header="Bench Press" key="1">
          <Tabs items={items} />
        </Panel>
      </Collapse>
    </>
  );
};

export default Workout;
