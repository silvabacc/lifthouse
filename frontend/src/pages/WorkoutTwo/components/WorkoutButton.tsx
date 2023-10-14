import { Button, ButtonProps } from "antd";
import React from "react";

interface WorkoutButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const WorkoutButton: React.FC<WorkoutButtonProps> = ({
  children,
  disabled,
  onClick,
  type = "primary",
}) => {
  return (
    <Button
      style={{ marginTop: 12, marginBottom: 12, width: "50%" }}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default WorkoutButton;
