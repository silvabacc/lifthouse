import React, { useEffect, useState } from "react";
import { Button, Space, Typography } from "antd";

import "../../../../backend/dexie";
import { pageTitleMapping } from "./constants";
import { Routine } from "../../../../backend/data";
import { Container } from "./WorkoutStyles";
import { useAppContext } from "@frontend/context/AppContext";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useDatabase } from "@frontend/hooks/useDatabase";

const { Title } = Typography;

interface WorkoutProps {
  routine: Routine;
}

const Workout: React.FC<WorkoutProps> = ({ routine }) => {
  const { queryRoutine } = useDatabase();
  const {
    auth: { user },
  } = useAuthentication();
  const { data } = queryRoutine(routine, user.id);

  console.log(data);

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
