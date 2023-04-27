import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Collapse, Tabs, TabsProps, Typography } from "antd";

import "../../../../backend/db";
import SetsReps from "./SetsReps";
import { useDatabase } from "../hooks/useDatabase";
import { pageTitleMapping, paramsMapping, routineSetup } from "./constants";
import { Routine } from "../../../../backend/data";

const { Panel } = Collapse;
const { Title } = Typography;

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
      {routineSetup[routine].map((item) => {
        return (
          <Collapse size="large">
            <Panel header={item} key="1">
              <Tabs items={items} />
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
};

export default Workout;
