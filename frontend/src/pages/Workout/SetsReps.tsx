import React, { useEffect, useState } from "react";
import { StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./components/WorkoutButton";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise, Routine } from "../../../../backend/data";
import { useParams } from "react-router-dom";

interface SetsRepsProps {
  exercise: Exercise;
}

const SetsReps: React.FC<SetsRepsProps> = ({ exercise }) => {
  const { routineType } = useParams();

  const [current, setCurrent] = useState(0);
  const { fetchTemporaryStorage } = useDatabase();
  const { data } = fetchTemporaryStorage(routineType as Routine);

  useEffect(() => {
    if (data && data?.length) {
      const currentFromTempStorage = data.find(
        (tempStorage) => tempStorage.exercise.name === exercise.name
      );
      currentFromTempStorage && setCurrent(currentFromTempStorage?.set);
    }
  }, [data]);

  const { sets } = exercise;

  let items: StepProps[] = [];

  for (let i = 0; i < (sets || 0); i++) {
    const tempStorage =
      data &&
      data?.find(
        (temp) => temp.set === i && temp.exercise.name === exercise.name
      );

    items = [
      ...items,
      {
        title: `Set ${i + 1}`,
        description: (
          <SetsRepsRow
            set={i + 1}
            exercise={exercise}
            overrideReps={tempStorage?.reps}
            overrideWeights={tempStorage?.weight}
            next={setCurrent}
            disabled={i !== current}
          />
        ),
      },
    ];
  }
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
