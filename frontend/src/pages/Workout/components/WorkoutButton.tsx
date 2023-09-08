import { Button, ButtonProps } from "antd";
import React from "react";
import WorkoutButtonStyles from "./WorkoutButtonStyles";

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
    <WorkoutButtonStyles type={type} onClick={onClick} disabled={disabled}>
      {children}
    </WorkoutButtonStyles>
  );
};

export default WorkoutButton;
