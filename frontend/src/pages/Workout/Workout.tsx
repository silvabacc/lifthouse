import React, { useEffect, useState } from "react";
import { Button, Space, Typography } from "antd";

import "../../../../backend/dexie";
import { pageTitleMapping } from "./constants";
import { Container } from "./WorkoutStyles";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Exercises from "./Exercises";
import { RoutineExercise, RoutineType } from "@backend/types";
import EditRoutine from "./EditRoutine";

const { Title } = Typography;

interface WorkoutProps {
  routine: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const [currentExercises, setCurrentExercises] = useState<RoutineExercise[]>();
  const { queryRoutine, updateRoutine } = useDatabase();
  const { data, isLoading } = queryRoutine(routine);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setCurrentExercises(data.routine.exercises);
    }
  }, [edit]);

  const onEdit = () => {
    setEdit((prev) => !prev);

    if (data && currentExercises) {
      updateRoutine(data?.routine.routineId, currentExercises);
    }
  };

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <>
      <Container direction="vertical">
        <Space direction="horizontal">
          <Title>{pageTitleMapping[routine]}</Title>
          <Button onClick={onEdit} type="link">
            {edit ? "Save" : "Edit"}
          </Button>
        </Space>
        {edit ? (
          <EditRoutine
            data={data}
            currentExercises={currentExercises}
            setCurrentExercises={setCurrentExercises}
          />
        ) : (
          <Exercises data={data} />
        )}
        {/* <Exercises data={data} /> */}
      </Container>
    </>
  );
};

export default Workout;
