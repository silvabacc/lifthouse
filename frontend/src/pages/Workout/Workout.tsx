import React, { useEffect, useState } from "react";

import "../../../../backend/dexie";
import { pageTitleMapping } from "./constants";
import { Container, EditButton } from "./WorkoutStyles";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Exercises from "./Exercises";
import { RoutineExercise, RoutineType } from "@backend/types";
import EditRoutine from "./EditRoutine";
import Loading from "../common/Loading";
import Header from "../common/Header";

interface WorkoutProps {
  routine: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const [currentExercises, setCurrentExercises] = useState<RoutineExercise[]>(
    []
  );
  const { queryRoutine, updateRoutine } = useDatabase();
  const { data, isLoading, refetch } = queryRoutine(routine);

  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (data) {
      setCurrentExercises(data.routine.exercises);
    }
  }, [edit, data]);

  const onEdit = async () => {
    setEdit((prev) => !prev);

    if (data) {
      await updateRoutine(data?.routine.routineId, currentExercises);
      refetch();
    }
  };

  if (isLoading || data === undefined) {
    return <Loading />;
  }

  return (
    <>
      <Container direction="vertical">
        <Header
          title={pageTitleMapping[routine]}
          rightHandSide={
            <EditButton onClick={onEdit} type="link">
              {edit ? "Save" : "Edit"}
            </EditButton>
          }
        />
        {edit ? (
          <EditRoutine
            data={data}
            currentExercises={currentExercises}
            setCurrentExercises={setCurrentExercises}
          />
        ) : (
          <Exercises data={data} />
        )}
      </Container>
    </>
  );
};

export default Workout;
