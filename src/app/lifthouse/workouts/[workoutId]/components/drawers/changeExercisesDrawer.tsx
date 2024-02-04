import { Drawer, Space } from "antd";
import { Reorder, useDragControls } from "framer-motion";
import { useWorkoutIdContext } from "../../context";
import { useEffect, useState } from "react";
import { SelectExercise, SelectRepsScheme } from "../selectors";
import { MenuOutlined } from "@ant-design/icons";
import { useWorkout } from "../../../hooks/useWorkout";

type Props = {
  show: boolean;
  onCancel: () => void;
};
export default function ChangeExercisesDrawer({ show, onCancel }: Props) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const { updateWorkoutPlan } = useWorkout();

  //State that holds the exercises that are not yet updated
  const [updatedWorkoutExercises, setUpdatedWorkoutExercises] = useState(
    workout.exercises || []
  );
  const controls = useDragControls();

  useEffect(() => {
    setUpdatedWorkoutExercises(workout.exercises || []);
  }, [workout]);

  const onClose = async () => {
    const updatedWorkout = await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: updatedWorkoutExercises,
    });

    if (!updatedWorkout) return;

    // Checks if the exercises has been updated
    if (JSON.stringify(updatedWorkout) !== JSON.stringify(workout)) {
      setWorkout(updatedWorkout);
    }

    onCancel();
  };

  const onChangeExercise = async (exerciseId: number, value: number) => {
    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          exerciseId: value,
        };
      }
      return e;
    });

    setUpdatedWorkoutExercises(newExercises);
  };

  const onChangeReps = async (exerciseId: number, value: string) => {
    const [sets, reps] = value.split(":");

    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          sets: parseInt(sets),
          reps: reps,
        };
      }
      return e;
    });

    setUpdatedWorkoutExercises(newExercises);
  };

  return (
    <Drawer width={"100%"} open={show} onClose={onClose}>
      <Reorder.Group
        className="h-full"
        axis="y"
        values={updatedWorkoutExercises}
        onReorder={setUpdatedWorkoutExercises}
      >
        <Space size="large" className="w-full" direction="vertical">
          {updatedWorkoutExercises.map((item) => (
            <Reorder.Item
              className="p-2 shadow rounded flex justify-between items-center w-full bg-white"
              key={item?.exerciseId}
              value={item}
              dragControls={controls}
            >
              <Space direction="vertical" className="w-full">
                <SelectExercise
                  defaultExercise={item}
                  onChange={onChangeExercise}
                />
                <SelectRepsScheme
                  defaultExercise={item}
                  onChange={onChangeReps}
                />
              </Space>
              <MenuOutlined
                className="m-4"
                onPointerDown={(e) => controls.start(e)}
              />
            </Reorder.Item>
          ))}
        </Space>
      </Reorder.Group>
    </Drawer>
  );
}
