import { StepProps, Steps } from "antd";
import React, { useState } from "react";
import { useWorkoutContext } from "../WorkoutContext";
import { RoutineExercise } from "@backend/types";

interface SetsRepsStepsProps {
  exercise: RoutineExercise;
}

const SetsRepsSteps: React.FC<SetsRepsStepsProps> = ({ exercise }) => {
  const { workoutData } = useWorkoutContext();

  const [currentSet, setCurrentSet] = useState(0);

  console.log(workoutData);

  const onChange = (value: number) => {
    setCurrentSet(value);
  };

  const items: StepProps[] = [];
  for (let i = 0; i < exercise.sets; i++) {
    items.push({
      title: `Set ${i + 1}`,
      description: `Reps: ${exercise.reps}`,
    });
  }

  return (
    <Steps
      current={currentSet}
      onChange={onChange}
      direction="vertical"
      items={items}
    />
  );
};

export default SetsRepsSteps;
