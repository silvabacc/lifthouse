import React, { useState } from "react";
import { Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";

const SetsReps: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const items = [
    {
      title: "Set 1",
      description: <SetsRepsRow next={setCurrent} />,
    },
    {
      title: "Set 2",
      description: <SetsRepsRow next={setCurrent} />,
    },
  ];

  return (
    <>
      <Steps direction="vertical" current={current} items={items} />
    </>
  );
};

export default SetsReps;
