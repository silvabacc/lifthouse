"use client";

import { Button, Drawer, Space } from "antd";
import { useWorkoutIdContext } from "../../context";
import { useEffect, useState, useTransition } from "react";
import { SelectExercise, SelectRepsScheme } from "../selectors";
import { ArrowUpOutlined, ArrowDownOutlined, SaveOutlined } from "@ant-design/icons";
import { updateWorkoutExercises } from "../../../actions";

type Props = {
  show: boolean;
  onCancel: () => void;
};

export default function ChangeExercisesDrawer({ show, onCancel }: Props) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [isPending, startTransition] = useTransition();
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

  const move = (index: number, direction: -1 | 1) => {
    setUpdatedExercises((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  return (
    <Drawer
      open={show}
      onClose={onCancel}
      title="Change exercises"
      width="min(440px, 100vw)"
      extra={
        <Button
          icon={<SaveOutlined />}
          type={isPending ? "default" : "primary"}
          loading={isPending}
          onClick={onSave}
        >
          {isPending ? "Saving" : "Save"}
        </Button>
      }
    >
      <div className="flex flex-col gap-4">
        {updatedExercises.map((item, index) => (
          <div
            key={item?.exerciseId}
            className="flex w-full items-center justify-between rounded-xl border border-solid border-gray-100 bg-white p-3 shadow-sm"
          >
            <Space orientation="vertical" className="w-full">
              <SelectExercise
                items={updatedExercises}
                defaultExercise={item}
                onChange={onChangeExercise}
              />
              <SelectRepsScheme defaultExercise={item} onChange={onChangeReps} />
            </Space>
            <div className="ml-2 flex flex-col">
              <Button
                type="text"
                size="small"
                icon={<ArrowUpOutlined />}
                disabled={index === 0}
                onClick={() => move(index, -1)}
                aria-label="Move exercise up"
              />
              <Button
                type="text"
                size="small"
                icon={<ArrowDownOutlined />}
                disabled={index === updatedExercises.length - 1}
                onClick={() => move(index, 1)}
                aria-label="Move exercise down"
              />
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
