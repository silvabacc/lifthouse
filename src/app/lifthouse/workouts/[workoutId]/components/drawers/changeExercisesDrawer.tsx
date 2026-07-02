"use client";

import { Button, Drawer, Space } from "antd";
import { Reorder } from "framer-motion";
import { useWorkoutIdContext } from "../../context";
import { useEffect, useState, useTransition } from "react";
import { SelectExercise, SelectRepsScheme } from "../selectors";
import { MenuOutlined, SaveOutlined } from "@ant-design/icons";
import { updateWorkoutExercises } from "../../../actions";

type Props = {
  show: boolean;
  onCancel: () => void;
};

export default function ChangeExercisesDrawer({ show, onCancel }: Props) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [isPending, startTransition] = useTransition();
  const [draggable, setDraggable] = useState(false);
  const [updatedExercises, setUpdatedExercises] = useState(workout.exercises || []);

  useEffect(() => {
    setUpdatedExercises(workout.exercises || []);
  }, [show, workout.exercises]);

  const onSave = () => {
    startTransition(async () => {
      const updated = await updateWorkoutExercises(workout.workoutId, updatedExercises);
      if (JSON.stringify(updated) !== JSON.stringify(workout)) {
        setWorkout(updated);
      }
      onCancel();
    });
  };

  const onChangeExercise = (exerciseId: number, value: number) => {
    setUpdatedExercises((prev) =>
      prev.map((e) => (e.exerciseId === exerciseId ? { ...e, exerciseId: value } : e))
    );
  };

  const onChangeReps = (exerciseId: number, value: string) => {
    const [sets, reps] = value.split(":");
    setUpdatedExercises((prev) =>
      prev.map((e) =>
        e.exerciseId === exerciseId ? { ...e, sets: parseInt(sets), reps } : e
      )
    );
  };

  return (
    <Drawer
      open={show}
      onClose={onCancel}
      title="Change exercises"
      extra={
        <Button
          icon={<SaveOutlined />}
          type={isPending ? "default" : "primary"}
          loading={isPending}
          onClick={onSave}
        >
          {isPending ? "Saving 🚀" : "Save"}
        </Button>
      }
    >
      <Reorder.Group
        className="p-0"
        axis="y"
        values={updatedExercises}
        onReorder={setUpdatedExercises}
      >
        <Space size="large" className="w-full" orientation="vertical">
          {updatedExercises.map((item) => (
            <Reorder.Item
              className="p-2 shadow rounded flex justify-between items-center w-full bg-white"
              key={item?.exerciseId}
              value={item}
              dragListener={draggable}
              onDragEnd={() => setDraggable(false)}
            >
              <Space orientation="vertical" className="w-full">
                <SelectExercise
                  items={updatedExercises}
                  defaultExercise={item}
                  onChange={onChangeExercise}
                />
                <SelectRepsScheme defaultExercise={item} onChange={onChangeReps} />
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
