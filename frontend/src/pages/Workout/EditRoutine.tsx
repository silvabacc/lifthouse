import React, { useEffect, useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise } from "../../../../backend/data";
import { Routines } from "../../../../backend/db";
import { Collapse, Space, Typography } from "antd";
import SelectExercise from "./components/SelectExercise";
import Container from "./WorkoutStyles";

const { Panel } = Collapse;
const { Text } = Typography;

interface EditRoutineProps {
  routine: Routines;
}

const EditRoutine: React.FC<EditRoutineProps> = ({ routine }) => {
  const { fetchExercises } = useDatabase();
  const { data: allExercises, status } = fetchExercises();
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>(
    routine.exercises
  );

  if (!allExercises) {
    return <>Loading...</>;
  }

  return (
    <Container direction="vertical">
      {routine.exercises.map((exercise) => (
        <Collapse collapsible="disabled" size="large">
          <Panel
            header={
              <Container direction="vertical">
                <SelectExercise
                  onChange={(value) => {
                    const routineWithoutExercise = routine.exercises.filter(
                      (exerciseFromRoutine) =>
                        exerciseFromRoutine.name !== exercise.name
                    );

                    setCurrentExercises([
                      ...routineWithoutExercise,
                      {
                        name: value,
                        type: exercise.type,
                      },
                    ]);
                  }}
                  showSearch
                  defaultValue={exercise.name}
                  options={allExercises
                    .filter(
                      (exercise) =>
                        !currentExercises
                          .map(
                            (routineFromExercise) => routineFromExercise.name
                          )
                          .includes(exercise.name)
                    )
                    .filter(
                      (exerciseFromAll) =>
                        exerciseFromAll.type === exercise.type
                    )
                    .map((exercise) => ({
                      value: exercise.name,
                    }))
                    .sort((a, b) => (a.value > b.value ? 1 : -1))}
                />
                <Space>
                  <Text keyboard>{exercise.sets}</Text>x
                  <Text keyboard>{exercise.reps}</Text>
                </Space>
              </Container>
            }
            key={exercise.name}
          />
        </Collapse>
      ))}
    </Container>
  );
};

export default EditRoutine;
