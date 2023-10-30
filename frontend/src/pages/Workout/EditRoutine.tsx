import React from "react";
import { IntensityRepRange, VolumeRepRange } from "../../../../backend/data";
import { Col, Collapse, Row, SelectProps } from "antd";
import SelectExercise from "./components/SelectExercise";
import { Container, RepContainer } from "./WorkoutStyles";
import SelectRepRange from "./components/SelectRepRange";
import {
  Exercise,
  ExerciseType,
  RepRange,
  Routine,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useWorkout } from "./useWorkout";

const { Panel } = Collapse;

interface EditRoutineProps {
  data?: {
    routine: Routine;
    exercises: Exercise[];
  };
  currentExercises: RoutineExercise[];
  setCurrentExercises: (value: RoutineExercise[]) => void;
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
  const { queryExercises } = useWorkout();
  const { clearTemporaryStorageForExercise } = useTemporaryStorage();
  const { data: allExercises = [] } = queryExercises();

  if (!data) return null;

  const routineType = data.routine.routinesType;

  const repRangeOptions = RepRangeMapping[routineType].map(
    (setRepRange: RepRange) => {
      return {
        value: `${setRepRange.sets} x ${setRepRange.reps}`,
      };
    }
  );

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

  const additionalExercises = (options: SelectProps[]) => {
    const exerciseType = allExercises.find(
      (exercise) => exercise.exerciseId === options[0]?.value
    )?.exerciseType;

    if (ExerciseType.BICEPS === exerciseType) {
      return [
        {
          label: "Biceps",
          options,
        },
        {
          label: "Forearms",
          options: allExercises
            .filter((e) => e.exerciseType === ExerciseType.FOREARMS)
            .map((exercise) => ({
              label: exercise.exerciseName,
              value: exercise.exerciseId,
            })),
        },
      ];
    }

    if (ExerciseType.FOREARMS === exerciseType) {
      return [
        {
          label: "Forearms",
          options,
        },
        {
          label: "Biceps",
          options: allExercises
            .filter((e) => e.exerciseType === ExerciseType.BICEPS)
            .map((exercise) => ({
              label: exercise.exerciseName,
              value: exercise.exerciseId,
            })),
        },
      ];
    }

    return options;
  };

  return (
    <Row gutter={[6, 6]}>
      {currentExercises.map((exercise, index) => {
        const exerciseInfo = allExercises.find(
          (exerciseFromList) =>
            exerciseFromList.exerciseId === exercise.exerciseId
        );

        const exercisesWithType = allExercises
          //Filters exercises by type e.g. Vertical Push, Horizontal Push, etc
          .filter(
            (exerciseFromList) =>
              exerciseInfo?.exerciseType === exerciseFromList.exerciseType
          )
          //Removes any duplicated exercises from the list if already in the routine
          .filter(
            (exerciseFromList) =>
              !currentExercises
                .map((i) => i.exerciseId)
                .includes(exerciseFromList.exerciseId)
          )
          //Maps the exercises to the format required by the Select component
          .map((exerciseFromList) => ({
            value: exerciseFromList.exerciseId,
            label: exerciseFromList.exerciseName,
          }))
          //Sorts the exercises alphabetically
          .sort((a, b) => a.label.localeCompare(b.label));

        const exerciseOptions = additionalExercises(exercisesWithType);

        return (
          <Col xs={24} sm={8} key={index}>
            <Collapse collapsible="disabled" size="large">
              <Panel
                key={exercise.exerciseId}
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
                      options={exerciseOptions}
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
              />
            </Collapse>
          </Col>
        );
      })}
    </Row>
  );
};

export default EditRoutine;
