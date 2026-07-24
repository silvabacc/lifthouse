"use client";

import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useTransition } from "react";
import { useWorkoutIdContext } from "../context";
import { updateWorkoutExercises } from "../../actions";

type Props = {
  exerciseId: number;
};

export default function DeleteExerciseButton({ exerciseId }: Props) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [isPending, startTransition] = useTransition();

  const onClick = () => {
    const newExercises = workout.exercises.filter((e) => e.exerciseId !== exerciseId);
    startTransition(async () => {
      setWorkout({ ...workout, exercises: newExercises });
      await updateWorkoutExercises(workout.workoutId, newExercises);
    });
  };

  return (
    <Button
      type="link"
      className="ml-2"
      onClick={onClick}
      loading={isPending}
      danger
      icon={<DeleteOutlined className="text-rose-700" />}
    />
  );
}
