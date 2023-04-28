import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Collapse, Space, Tabs, TabsProps, Typography } from "antd";

import "../../../../backend/db";
import SetsReps from "./SetsReps";
import { useDatabase } from "../hooks/useDatabase";
import { pageTitleMapping, paramsMapping } from "./constants";
import { Routine } from "../../../../backend/data";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const Workout: React.FC = () => {
  const { routineType } = useParams();
  const { fetchRoutinePlan } = useDatabase();

  const routine: Routine = paramsMapping[routineType!];

  const { data: routines } = fetchRoutinePlan(routine);

  if (!routine) {
    return <>404 Not found</>;
  }

  return (
    <>
      <Title>{pageTitleMapping[routine]}</Title>
      {routines?.exercises.map((exercise) => {
        const items: TabsProps["items"] = [
          {
            key: "sets",
            label: `Sets & Reps`,
            children: <SetsReps sets={exercise.sets} />,
          },
          {
            key: "history",
            label: `History`,
            children: `History`,
          },
        ];

        return (
          <Collapse size="large">
            <Panel
              header={
                <Space direction="vertical">
                  <Text strong>{exercise.name}</Text>
                  <Space>
                    <Text keyboard>{exercise.sets}</Text>x
                    <Text keyboard>{exercise.reps}</Text>
                  </Space>
                </Space>
              }
              key={exercise.name}
            >
              <Tabs items={items} />
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
};

export default Workout;
