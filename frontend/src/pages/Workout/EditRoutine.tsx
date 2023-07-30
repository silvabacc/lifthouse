import React from "react";
import { useDatabase } from "../../hooks/useDatabase";
import { IntensityRepRange, VolumeRepRange } from "../../../../backend/data";
import { Collapse } from "antd";
import SelectExercise from "./components/SelectExercise";
import { Container, RepContainer } from "./WorkoutStyles";
import SelectRepRange from "./components/SelectRepRange";
import {
  Exercise,
  RepRange,
  Routine,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import Loading from "../common/Loading";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";

const { Panel } = Collapse;

interface EditRoutineProps {
  data: {
    routine: Routine;
    exercises: Exercise[];
  };
  currentExercises?: RoutineExercise[];
  setCurrentExercises: (value?: RoutineExercise[]) => void;
}

const RepRangeMapping = {
  [RoutineType.UPPER_INTENSITY]: IntensityRepRange,
  [RoutineType.LOWER_INTENSITY]: IntensityRepRange,
  [RoutineType.UPPER_VOLUME]: VolumeRepRange,
  [RoutineType.LOWER_VOLUME]: VolumeRepRange,
};

const EditRoutine: React.FC<EditRoutineProps> = ({
  data,
  currentExercises,
  setCurrentExercises,
}) => {
  const { queryExercises } = useDatabase();
  const { clearTemporaryStorageForExercise } = useTemporaryStorage();
  const { data: allExercises = [] } = queryExercises();

  const routineType = data.routine.routinesType;

  const repRangeOptions = RepRangeMapping[routineType].map(
    (setRepRange: RepRange) => {
      return {
        value: `${setRepRange.sets} x ${setRepRange.reps}`,
      };
    }
  );

  if (!currentExercises) {
    return <Loading />;
  }

  const onRepRangeChange = (value: string, index: number) => {
    const exercises = currentExercises.slice();
    const updatedExercise = exercises[index];
    const [sets, reps] = value.split(" x ");
    exercises[index] = {
      ...exercises[index],
      sets: parseInt(sets),
      reps: reps,
    };
    clearTemporaryStorageForExercise(updatedExercise.exerciseId);
    setCurrentExercises(exercises);
  };

  const onExerciseChange = (value: string, index: number) => {
    const exercises = currentExercises.slice();
    const updatedExercise = exercises[index];

    const exerciseToUpdate = allExercises.find(
      (exerciseFromList) => exerciseFromList.exerciseId === value
    );
    if (exerciseToUpdate) {
      exercises[index] = {
        ...exercises[index],
        exerciseId: exerciseToUpdate.exerciseId,
      };
    }
    clearTemporaryStorageForExercise(updatedExercise.exerciseId);
    setCurrentExercises(exercises);
  };

  return (
    <Container direction="vertical">
      {currentExercises.map((exercise, index) => {
        const exerciseInfo = allExercises.find(
          (exerciseFromList) =>
            exerciseFromList.exerciseId === exercise.exerciseId
        );

        const exercisesWithType = allExercises
          .filter(
            (exerciseFromList) =>
              exerciseInfo?.exerciseType === exerciseFromList.exerciseType
          )
          .map((exerciseFromList) => ({
            value: exerciseFromList.exerciseId,
            label: exerciseFromList.exerciseName,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        return (
          <Collapse collapsible="disabled" size="large" key={index}>
            <Panel
              header={
                <Container direction="vertical">
                  <SelectExercise
                    bordered={false}
                    filterOption={(input, option) =>
                      option?.label
                        .toLocaleLowerCase()
                        .indexOf(input.toLocaleLowerCase()) >= 0
                    }
                    onChange={(value) =>
                      onExerciseChange(value as string, index)
                    }
                    showSearch
                    value={exerciseInfo?.exerciseName}
                    options={exercisesWithType}
                  />
                  <RepContainer>
                    <SelectRepRange
                      options={repRangeOptions}
                      defaultValue={`${exercise.sets} x ${exercise.reps}`}
                      onChange={(value) =>
                        onRepRangeChange(value as string, index)
                      }
                    />
                  </RepContainer>
                </Container>
              }
              key={exercise.exerciseId}
            />
          </Collapse>
        );
      })}
    </Container>
  );
};

export default EditRoutine;
