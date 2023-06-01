import { TabsProps, Collapse, Space, Tabs, Typography } from "antd";
import { Routines } from "../../../../backend/dexie";
import SetsReps from "./SetsReps";
import WorkoutButton from "./components/WorkoutButton";
import { useNavigate } from "react-router-dom";
import { useDatabase } from "../../hooks/useDatabase";
import { Container } from "./WorkoutStyles";

interface ExercisesProps {
  routines: Routines;
  edit: boolean;
}

const { Panel } = Collapse;
const { Text } = Typography;

const Exercises: React.FC<ExercisesProps> = ({ routines, edit }) => {
  return (
    <Container direction="vertical">
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
          finishWorkout();
          clearTemporaryStorage();
        }}
      >
        Finish Workout
      </WorkoutButton>
    </Container>
  );
};

export default Exercises;
