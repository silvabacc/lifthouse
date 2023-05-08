import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Space, Typography } from "antd";

import "../../../../backend/db";
import { useDatabase } from "../hooks/useDatabase";
import { pageTitleMapping } from "./constants";
import { Routine } from "../../../../backend/data";
import EditRoutine from "./EditRoutine";
import { Container } from "./WorkoutStyles";
import Exercises from "./Exercises";

const { Title } = Typography;

const Workout: React.FC = () => {
  const { routineType } = useParams();
  const { fetchRoutinePlan } = useDatabase();
  const [edit, setEdit] = useState(false);

  const { data: routines, isLoading, refetch } = fetchRoutinePlan(routineType);

  useEffect(() => {
    if (!edit) {
      refetch();
    }
  }, [edit]);

  if (!Object.values(Routine).includes(routineType)) {
    return <>Not found</>;
  }

  if (isLoading || !routines) {
    return <>Loading...</>;
  }

  return (
    <>
      <Container direction="vertical">
        <Space direction="horizontal">
          <Title>{pageTitleMapping[routineType]}</Title>
          <Button
            onClick={() => {
              setEdit((prev) => !prev);
            }}
            type="link"
          >
            {edit ? "Save" : "Edit"}
          </Button>
        </Space>
        <EditRoutine routine={routines} edit={edit} />
        <Exercises routines={routines} edit={edit} />
      </Container>
    </>
  );
};

export default Workout;
