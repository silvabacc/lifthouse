import { Button, ButtonProps } from "antd";
import style from "./WorkoutButton.module.scss";
import React from "react";

interface WorkoutButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const WorkoutButton: React.FC<WorkoutButtonProps> = ({
  children,
  disabled,
  onClick,
}) => {
  return (
    <Button
      className={style.WorkoutButton}
      type="primary"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default WorkoutButton;
