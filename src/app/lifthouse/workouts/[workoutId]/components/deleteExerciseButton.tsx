import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useWorkoutIdContext } from "../context";
import { useWorkout } from "../../hooks/useWorkout";

type Props = {
  exerciseId: number;
};
export default function DeleteExerciseButton({ exerciseId }: Props) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const { updateWorkoutPlan } = useWorkout();

  const onClick = async () => {
    const newExercises = workout.exercises.filter(
      (e) => e.exerciseId !== exerciseId
    );

    await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: newExercises,
    });

    setWorkout({
      ...workout,
      exercises: newExercises,
    });
  };

  return (
    <Button
      type="link"
      className="ml-2"
      onClick={onClick}
      danger
      icon={<DeleteOutlined className="text-rose-700" />}
    />
  );
}
