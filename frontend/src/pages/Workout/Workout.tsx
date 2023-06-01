import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Space, Typography } from "antd";

import "../../../../backend/dexie";
import { useDatabase } from "../../hooks/useDatabase";
import { pageTitleMapping } from "./constants";
import { Routine } from "../../../../backend/data";
import EditRoutine from "./EditRoutine";
import { Container } from "./WorkoutStyles";
import Exercises from "./Exercises";

const { Title } = Typography;

interface WorkoutProps {
  routine: Routine;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const [edit, setEdit] = useState(false);

  const onEdit = () => setEdit((prev) => !prev);

  return (
    <>
      <Container direction="vertical">
        <Space direction="horizontal">
          <Title>{pageTitleMapping[routine]}</Title>
          <Button onClick={onEdit} type="link">
            {edit ? "Save" : "Edit"}
          </Button>
        </Space>
        {/* <EditRoutine routine={routines} edit={edit} /> */}
        {/* <Exercises routines={routines} edit={edit} /> */}
      </Container>
    </>
  );
};

export default Workout;
