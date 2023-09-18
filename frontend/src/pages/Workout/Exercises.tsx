import { Col, Collapse, Layout, Row, Space, Tabs, Typography } from "antd";
import SetsReps from "./SetsReps";
import WorkoutButton from "./components/WorkoutButton";
import { FinishWorkoutFooter } from "./WorkoutStyles";
import { Exercise, Routine } from "@backend/types";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "@frontend/hooks/useDatabase";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import History from "./History";
import { useState } from "react";
import React from "react";

interface ExercisesProps {
  data: {
    routine: Routine;
    exercises: Exercise[];
  };
}

const { Panel } = Collapse;
const { Text } = Typography;
const { Content, Footer } = Layout;

const Exercises: React.FC<ExercisesProps> = ({ data }) => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const { logEntry } = useDatabase();
  const { clearTemporaryStorage } = useTemporaryStorage();

  const finishWorkout = async () => {
    setSaving(true);
    const saved = await logEntry(data.exercises);
    if (saved) {
      clearTemporaryStorage();
      navigate("/");
      setSaving(false);
    }
  };

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>
        <Row gutter={[6, 6]}>
          {data.routine.exercises.map((exerciseFromRoutine, index) => {
            const exercise =
              data.exercises.find(
                (exercise) =>
                  exercise.exerciseId === exerciseFromRoutine.exerciseId
              ) || ({} as Exercise);

            const items = [
              {
                key: "sets",
                label: `Sets & Reps`,
                children: (
                  <SetsReps
                    exercise={exercise}
                    sets={exerciseFromRoutine.sets}
                  />
                ),
              },
              {
                key: "history",
                label: `History`,
                children: <History exerciseId={exercise.exerciseId} />,
              },
            ];

            return (
              <Col xs={24} sm={8} key={index}>
                <Collapse size="large">
                  <Panel
                    key={exercise.exerciseName}
                    header={
                      <Space direction="vertical">
                        <Text strong>{exercise.exerciseName}</Text>
                        <Space>
                          <Text keyboard>{exerciseFromRoutine.sets}</Text>x
                          <Text keyboard>{exerciseFromRoutine.reps}</Text>
                        </Space>
                      </Space>
                    }
                  >
                    <Tabs items={items} />
                  </Panel>
                </Collapse>
              </Col>
            );
          })}
        </Row>
      </Content>
      <Footer style={{ marginTop: 8 }}>
        <FinishWorkoutFooter>
          <WorkoutButton
            type={saving ? "default" : "primary"}
            onClick={() => {
              finishWorkout();
            }}
          >
            {saving ? "Saving..." : "Finish Workout"}
          </WorkoutButton>
        </FinishWorkoutFooter>
      </Footer>
    </Layout>
  );
};

export default Exercises;
