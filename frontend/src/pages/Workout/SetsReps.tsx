import React, { useState } from "react";
import { Button, StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./WorkoutButton";

interface SetsRepsProps {
  sets?: number;
}

const SetsReps: React.FC<SetsRepsProps> = ({ sets }) => {
  const [current, setCurrent] = useState(0);

  let items: StepProps[] = [];

  for (let i = 0; i < (sets || 0); i++) {
    items = [
      ...items,
      {
        title: `Set ${i + 1}`,
        description: <SetsRepsRow next={setCurrent} disabled={i !== current} />,
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
