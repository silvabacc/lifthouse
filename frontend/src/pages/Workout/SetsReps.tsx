import React, { useState } from "react";
import { Button, StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import style from "./SetsReps.module.scss";

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
      <Button
        type="primary"
        className={style.SetsReps__Button}
        onClick={() => setCurrent((prev) => prev - 1)}
        disabled={current === 0}
      >
        Previous Set
      </Button>
    </>
  );
};

export default SetsReps;
