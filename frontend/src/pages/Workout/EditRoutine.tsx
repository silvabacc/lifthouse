import React, { useState } from "react";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise, Routine } from "../../../../backend/data";
import { Routines } from "../../../../backend/db";
import { Collapse, Select, Space, Typography } from "antd";
import SelectExercise from "./SelectExercise";

const { Panel } = Collapse;
const { Text } = Typography;

interface EditRoutineProps {
  routine: Routines;
}

const EditRoutine: React.FC<EditRoutineProps> = ({ routine }) => {
  const { fetchExercises } = useDatabase();
  const { data: allExercises } = fetchExercises();
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>([]);

  if (!allExercises) {
    return <>Loading...</>;
  }

  return (
    <Space direction="vertical" style={{ width: "100%" }}>
      {routine.exercises.map((exercise) => (
        <Collapse collapsible="disabled" size="large">
          <Panel
            header={
              <Space direction="vertical" style={{ width: "100%" }}>
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
                    .map((exercise) => ({
                      value: exercise.name,
                    }))}
                />
                <Space>
                  <Text keyboard>{exercise.sets}</Text>x
                  <Text keyboard>{exercise.reps}</Text>
                </Space>
              </Space>
            }
            key={exercise.name}
          />
        </Collapse>
      ))}
    </Space>
  );
};

export default EditRoutine;
