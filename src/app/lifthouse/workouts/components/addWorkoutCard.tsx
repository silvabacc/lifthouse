"use client";

import { useState, useTransition } from "react";
import AddButton from "./addButton";
import WorkoutFormDrawer from "./workoutDrawerForm";
import { createWorkout } from "../actions";

type FieldType = {
  name: string;
  description: string;
};

export default function AddWorkoutCard() {
  const [drawOpen, setDrawOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onFinish = (info: FieldType) => {
    startTransition(() => createWorkout(info.name, info.description));
    // redirect happens server-side — component unmounts automatically
  };

  return (
    <>
      <AddButton title="+ Add Workout Plan" onClick={() => setDrawOpen(true)} />
      <WorkoutFormDrawer
        title="Add workout plan"
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        onFinish={onFinish}
        isLoading={isPending}
      />
    </>
  );
}
