import React from "react";
import { useWorkoutContext } from "./WorkoutContext";
import { Button } from "antd";
import { Exercises } from "./Exercises";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";

const WorkoutContent: React.FC = () => {
  const { isEditing, setEditing } = useWorkoutContext();

  const onEdit = () => {
    setEditing(!isEditing);
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
      {isEditing ? <>Editing</> : <Exercises />}
    </>
  );
};

export default WorkoutContent;
