import React, { useState } from "react";
import { Button, StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./WorkoutButton";
import { useDatabase } from "../hooks/useDatabase";
import { Exercise } from "../../../../backend/data";

interface SetsRepsProps {
  exercise: Exercise;
}

const SetsReps: React.FC<SetsRepsProps> = ({ exercise }) => {
  const [current, setCurrent] = useState(0);
  const { sets } = exercise;

  let items: StepProps[] = [];

  for (let i = 0; i < (sets || 0); i++) {
    items = [
      ...items,
      {
        title: `Set ${i + 1}`,
        description: (
          <SetsRepsRow
            set={i + 1}
            exercise={exercise}
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
