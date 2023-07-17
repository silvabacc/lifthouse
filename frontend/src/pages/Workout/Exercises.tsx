import { Collapse, Space, Tabs, Typography } from "antd";
import SetsReps from "./SetsReps";
import WorkoutButton from "./components/WorkoutButton";
import { Container } from "./WorkoutStyles";
import { Exercise, Routine } from "@backend/types";
import { useNavigate } from "react-router-dom";

interface ExercisesProps {
  data: {
    routine: Routine;
    exercises: Exercise[];
  };
}

const { Panel } = Collapse;
const { Text } = Typography;

const Exercises: React.FC<ExercisesProps> = ({ data }) => {
  const navigate = useNavigate();

  return (
    <Container direction="vertical">
      {data.routine.exercises.map((exerciseFromRoutine, index) => {
        const exercise =
          data.exercises.find(
            (exercise) => exercise.exerciseId === exerciseFromRoutine.exerciseId
          ) || ({} as Exercise);

        const items = [
          {
            key: "sets",
            label: `Sets & Reps`,
            children: (
              <SetsReps exercise={exercise} sets={exerciseFromRoutine.sets} />
            ),
          },
          {
            key: "history",
            label: `History`,
            children: `History`,
          },
        ];

        return (
          <Collapse size="large" key={index}>
            <Panel
              header={
                <Space direction="vertical">
                  <Text strong>{exercise.exerciseName}</Text>
                  <Space>
                    <Text keyboard>{exerciseFromRoutine.sets}</Text>x
                    <Text keyboard>{exerciseFromRoutine.reps}</Text>
                  </Space>
                </Space>
              }
              key={exercise.exerciseName}
            >
              <Tabs items={items} />
            </Panel>
          </Collapse>
        );
      })}
      <WorkoutButton
        onClick={() => {
          navigate("/");
          // finishWorkout();
          // clearTemporaryStorage();
        }}
      >
        Finish Workout
      </WorkoutButton>
    </Container>
  );
};

export default Exercises;
