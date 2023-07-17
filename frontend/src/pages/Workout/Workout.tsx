import React, { useState } from "react";
import { Button, Space, Typography } from "antd";

import "../../../../backend/dexie";
import { pageTitleMapping } from "./constants";
import { Container } from "./WorkoutStyles";
import { useDatabase } from "@frontend/hooks/useDatabase";
import Exercises from "./Exercises";
import { RoutineType } from "@backend/types";

const { Title } = Typography;

interface WorkoutProps {
  routine: RoutineType;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const { queryRoutine } = useDatabase();
  const { data, isLoading } = queryRoutine(routine);

  const [edit, setEdit] = useState(false);
  const onEdit = () => setEdit((prev) => !prev);

  if (isLoading || data === undefined) {
    return <>Loading...</>;
  }

  return (
    <>
      <Container direction="vertical">
        <Space direction="horizontal">
          <Title>{pageTitleMapping[routine]}</Title>
          <Button onClick={onEdit} type="link">
            {edit ? "Save" : "Edit"}
          </Button>
        </Space>
        {/* {edit ? <EditRoutine routine={data} /> : <Exercises routine={data} />} */}
        <Exercises data={data} />
      </Container>
    </>
  );
};

export default Workout;
