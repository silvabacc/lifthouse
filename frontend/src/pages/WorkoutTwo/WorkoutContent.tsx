import React from "react";
import { useWorkoutContext } from "./WorkoutContext";
import { Button } from "antd";
import { Exercises } from "./Exercises";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useWorkout } from "./useWorkout";

const WorkoutContent: React.FC = () => {
  const { isEditing, setEditing, workoutData } = useWorkoutContext();
  const { updateRoutine } = useWorkout();

  const onEdit = () => {
    setEditing(!isEditing);
    updateRoutine(workoutData.routine);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "right" }}>
        <Button
          style={{ marginLeft: "auto", marginRight: 0 }}
          onClick={onEdit}
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <Exercises />
    </>
  );
};

export default WorkoutContent;
