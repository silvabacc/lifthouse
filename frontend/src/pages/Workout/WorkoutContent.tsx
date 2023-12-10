import React from "react";
import { useWorkoutContext } from "./WorkoutContext";
import { Button, Space } from "antd";
import { Exercises } from "./Exercises";
import { EditOutlined, SaveOutlined, SearchOutlined } from "@ant-design/icons";
import { useWorkout } from "./useWorkout";
import { useNavigate } from "react-router-dom";

const WorkoutContent: React.FC = () => {
  const { isEditing, setEditing, workoutData } = useWorkoutContext();
  const { updateRoutine } = useWorkout();
  const navigate = useNavigate();

  const onEdit = () => {
    setEditing(!isEditing);
    updateRoutine(workoutData.routine);
  };

  return (
    <>
      <Space style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          onClick={() => navigate("/exercises")}
          icon={<SearchOutlined />}
        >
          Search
        </Button>
        <Button
          onClick={onEdit}
          icon={isEditing ? <SaveOutlined /> : <EditOutlined />}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Space>
      <Exercises />
    </>
  );
};

export default WorkoutContent;
