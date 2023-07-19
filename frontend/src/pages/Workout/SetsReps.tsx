import React, { useEffect, useState } from "react";
import { StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./components/WorkoutButton";
import { Exercise } from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { LogEntryStorage } from "@backend/dexie";

interface SetsRepsProps {
  exercise: Exercise;
  sets: number;
}

const SetsReps: React.FC<SetsRepsProps> = ({ exercise, sets }) => {
  const [current, setCurrent] = useState(0);
  const { getTemporaryStorage, removeSetFromExercise } = useTemporaryStorage();
  const tempData = getTemporaryStorage(exercise.exerciseId);
  const [temporaryStorage, setTemporaryStorage] = useState<LogEntryStorage>();

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      setTemporaryStorage(await tempData);
    };

    fetchTemporaryStorage();
  }, [tempData]);

  const stepItems: StepProps[] = [];

  for (let i = 0; i < sets; i++) {
    const info =
      temporaryStorage?.exerciseId === exercise.exerciseId
        ? temporaryStorage?.info.find((info) => info.set === i + 1)
        : undefined;

    stepItems.push({
      title: `Set ${i + 1}`,
      description: (
        <SetsRepsRow
          set={i + 1}
          exercise={exercise}
          overrideReps={info?.reps}
          overrideWeights={info?.reps}
          next={setCurrent}
          disabled={i !== current}
        />
      ),
    });
  }

  useEffect(() => {
    if (
      temporaryStorage &&
      temporaryStorage.exerciseId === exercise.exerciseId
    ) {
      setCurrent(temporaryStorage.info.length);
    }
  }, [JSON.stringify(temporaryStorage)]);

  return (
    <>
      <Steps direction="vertical" current={current} items={stepItems} />
      <WorkoutButton
        onClick={() => {
          removeSetFromExercise(exercise.exerciseId, current);
          setCurrent((prev) => prev - 1);
        }}
        disabled={current === 0}
      >
        Previous Set
      </WorkoutButton>
    </>
  );
};

export default SetsReps;
