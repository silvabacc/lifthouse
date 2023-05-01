import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Collapse,
  Space,
  Tabs,
  TabsProps,
  Typography,
  AutoComplete,
} from "antd";

import "../../../../backend/db";
import SetsReps from "./SetsReps";
import { useDatabase } from "../hooks/useDatabase";
import { pageTitleMapping, paramsMapping } from "./constants";
import { Routine } from "../../../../backend/data";
import WorkoutButton from "./WorkoutButton";
import EditExercise from "./EditExercise";

const { Panel } = Collapse;
const { Title, Text } = Typography;

const Workout: React.FC = () => {
  const { routineType } = useParams();
  const { fetchRoutinePlan, clearTemporaryStorage } = useDatabase();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const { data: routines, isLoading } = fetchRoutinePlan(routineType);

  if (!Object.values(Routine).includes(routineType)) {
    return <>Not found</>;
  }

  return (
    <>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <Space direction="vertical" style={{ marginBottom: 8 }}>
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
              <Collapse
                size="large"
                collapsible={edit ? "disabled" : undefined}
                activeKey={edit ? [] : collapsed}
                style={{ width: edit ? "90%" : "100%" }}
                onChange={(keys) => setCollapsed(keys as string[])}
              >
                <Panel
                  header={
                    <Space direction="vertical">
                      {edit ? (
                        <EditExercise
                          placeholder={exercise.name}
                          exerciseType={exercise.type}
                        />
                      ) : (
                        <Text strong>{exercise.name}</Text>
                      )}
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
        </Space>
      )}
    </>
  );
};

export default Workout;
