import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Collapse, Space, Tabs, TabsProps, Typography } from "antd";

import "../../../../backend/db";
import SetsReps from "./SetsReps";
import { useDatabase } from "../hooks/useDatabase";
import { pageTitleMapping } from "./constants";
import { Routine } from "../../../../backend/data";
import WorkoutButton from "./components/WorkoutButton";
import EditRoutine from "./EditRoutine";
import { Container } from "./WorkoutStyles";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const Workout: React.FC = () => {
  const { routineType } = useParams();
  const { fetchRoutinePlan, clearTemporaryStorage } = useDatabase();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  const { data: routines, isLoading } = fetchRoutinePlan(routineType);

  if (!Object.values(Routine).includes(routineType)) {
    return <>Not found</>;
  }

  if (isLoading || !routines) {
    return <>Loading...</>;
  }

  return (
    <>
      <Container direction="vertical">
        <Space direction="horizontal">
          <Title>{pageTitleMapping[routineType]}</Title>
          <Button
            onClick={() => {
              setEdit((prev) => !prev);
            }}
            type="link"
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Space>
        {edit ? (
          <>
            <EditRoutine routine={routines} />
          </>
        ) : (
          <>
            {routines?.exercises.map((exercise) => {
              const items: TabsProps["items"] = [
                {
                  key: "sets",
                  label: `Sets & Reps`,
                  children: <SetsReps exercise={exercise} />,
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
            <WorkoutButton
              onClick={() => {
                navigate("/");
                clearTemporaryStorage();
              }}
            >
              Finish Workout
            </WorkoutButton>
          </>
        )}
      </Container>
    </>
  );
};

export default Workout;
