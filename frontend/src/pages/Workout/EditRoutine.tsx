import React, { useEffect, useState } from "react";
import { useDatabase } from "../../hooks/useDatabase";
import {
  Exercise,
  ExerciseType,
  IntensityRepRange,
  RepRange,
  Routine,
  VolumeRepRange,
} from "../../../../backend/data";
import { Routines } from "../../../../backend/dexie";
import { Collapse } from "antd";
import SelectExercise from "./components/SelectExercise";
import { Container, RepContainer } from "./WorkoutStyles";
import SelectRepRange from "./components/SelectRepRange";
import { useParams } from "react-router-dom";

const { Panel } = Collapse;

interface EditRoutineProps {
  routine: Routines;
  edit: boolean;
}

const RepRangeMapping = {
  [Routine.UPPER_INTENSITY]: IntensityRepRange,
  [Routine.LOWER_INTENSITY]: IntensityRepRange,
  [Routine.UPPER_VOLUME]: VolumeRepRange,
  [Routine.LOWER_VOLUME]: VolumeRepRange,
};

const EditRoutine: React.FC<EditRoutineProps> = ({ routine, edit }) => {
  const { fetchExercises, updateRoutine } = useDatabase();
  const { routineType } = useParams();
  const { data: allExercises } = fetchExercises();
  const [currentExercises, setCurrentExercises] = useState<Exercise[]>(
    routine.exercises
  );

  useEffect(() => {
    if (!edit) {
      updateRoutine(currentExercises, routine);
    }
  }, [edit]);

  if (!allExercises) {
    return <>Loading...</>;
  }

  if (!edit) {
    return <></>;
  }

  const repRangeOptions = RepRangeMapping[routineType].map(
    (setRepRange: RepRange) => {
      return {
        label: `${setRepRange.sets} x ${setRepRange.reps}`,
        value: `${setRepRange.sets} x ${setRepRange.reps}`,
      };
    }
  );

  /**
   *
   * @param newExercise New exercise that will update @param exerciseToUpdate
   * @param exerciseToUpdate Exercise name that will be replaced with the @param newExercise
   *                         if left empty, it will add the exercise to the list
   */
  const updateExercise = (newExercise: Exercise, exerciseToUpdate?: string) => {
    const routineWithoutExercise = currentExercises.filter(
      (exerciseFromRoutine) => exerciseFromRoutine.name !== exerciseToUpdate
    );

    const orderedTypes = Object.values(ExerciseType);

    const sortedExercises = [...routineWithoutExercise, newExercise].sort(
      (a, b) => {
        const indexA = orderedTypes.indexOf(a.type);
        const indexB = orderedTypes.indexOf(b.type);
        return indexA - indexB;
      }
    );

    setCurrentExercises(sortedExercises);
  };

  return (
    <Container direction="vertical">
      {currentExercises.map((exercise, index) => {
        const exercisesNotInRoutine = allExercises
          .filter(
            (exercise) =>
              !currentExercises
                .map((routineFromExercise) => routineFromExercise.name)
                .includes(exercise.name)
          )
          .filter((exerciseFromAll) => exerciseFromAll.type === exercise.type)
          .map((exercise) => ({
            value: exercise.name,
          }))
          .sort((a, b) => (a.value > b.value ? 1 : -1));

        return (
          <Collapse collapsible="disabled" size="large" key={index}>
            <Panel
              header={
                <Container direction="vertical">
                  <SelectExercise
                    bordered={false}
                    onChange={(value) => {
                      const previousExercise = currentExercises.find(
                        (currentExercise) =>
                          currentExercise.name == exercise.name
                      );

                      updateExercise(
                        {
                          name: value as string,
                          type: exercise.type,
                          sets: previousExercise?.sets,
                          reps: previousExercise?.reps,
                        },
                        previousExercise?.name
                      );
                    }}
                    showSearch
                    defaultValue={exercise.name}
                    options={exercisesNotInRoutine}
                  />
                  <RepContainer>
                    <SelectRepRange
                      options={repRangeOptions}
                      defaultValue={`${exercise.sets} x ${exercise.reps}`}
                      onChange={(value) => {
                        const setRepsValueChange = (value as string)
                          .split("x")
                          .map((setRepRange) => setRepRange.trim());

                        updateExercise(
                          {
                            name: exercise.name,
                            type: exercise.type,
                            sets: parseInt(setRepsValueChange[0]),
                            reps: setRepsValueChange[1],
                          },
                          exercise.name
                        );
                      }}
                    />
                  </RepContainer>
                </Container>
              }
              key={exercise.name}
            />
          </Collapse>
        );
      })}
    </Container>
  );
};

export default EditRoutine;
