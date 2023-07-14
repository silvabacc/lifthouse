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
  const { getTemporaryStorage } = useTemporaryStorage();
  const { data } = getTemporaryStorage(exercise.exerciseId);
  const [temporaryStorage, setTemporaryStorage] = useState<LogEntryStorage>();

  useEffect(() => {
    if (data) {
      setTemporaryStorage(data);
    }
  }, [data]);

  const items: StepProps[] = [];
  for (let i = 0; i < sets; i++) {
    const info = temporaryStorage?.info.find((info) => info.set === i + 1);

    items.push({
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
  }, [temporaryStorage]);

  return (
    <>
      <Steps direction="vertical" current={current} items={items} />
      <WorkoutButton
        onClick={() => setCurrent((prev) => prev - 1)}
        disabled={current === 0}
      >
        Previous Set
      </WorkoutButton>
    </>
  );
};

export default SetsReps;
