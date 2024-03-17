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

  //Could also use useDragControls from framer-motion but this is buggy with having separate ReOrder.Item components
  //So implemented my own way of doing this
  const [draggable, setDraggable] = useState(false);

  //State that holds the exercises that are not yet updated
  const [updatedWorkoutExercises, setUpdatedWorkoutExercises] = useState(
    workout.exercises || []
  );

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
    const newExercises = updatedWorkoutExercises.map((e) => {
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

    const newExercises = updatedWorkoutExercises.map((e) => {
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
    <Drawer
      width={"100%"}
      open={show}
      onClose={onClose}
      title="Change exercises"
    >
      <Reorder.Group
        className="p-0"
        axis="y"
        values={updatedWorkoutExercises}
        onReorder={setUpdatedWorkoutExercises}
      >
        <Space size="large" className="w-full" direction="vertical">
          {updatedWorkoutExercises.map((item, idx) => (
            //Do not put this in a child component, as ReOrder.Item is buggy when the state is updated
            <Reorder.Item
              className="p-2 shadow rounded flex justify-between items-center w-full bg-white"
              key={item?.exerciseId}
              value={item}
              dragListener={draggable}
              onDragEnd={() => setDraggable(false)}
            >
              <Space direction="vertical" className="w-full">
                <SelectExercise
                  items={updatedWorkoutExercises}
                  defaultExercise={item}
                  onChange={onChangeExercise}
                />
                <SelectRepsScheme
                  defaultExercise={item}
                  onChange={onChangeReps}
                />
              </Space>
              <MenuOutlined
                onMouseEnter={() => setDraggable(true)}
                onMouseLeave={() => setDraggable(false)}
                onTouchStart={() => setDraggable(true)}
                className="m-4"
              />
            </Reorder.Item>
          ))}
        </Space>
      </Reorder.Group>
    </Drawer>
  );
}
