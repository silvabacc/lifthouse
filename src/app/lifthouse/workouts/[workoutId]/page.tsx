"use client";

import { Button, Modal, Radio, Space } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { use, useEffect, useState } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/addExerciseDrawer";
import { useWorkout } from "../useWorkout";
import { Exercise, Workout } from "@/lib/supabase/db/types";
import { useRouter } from "next/navigation";

export default function WorkoutPlanPage({
  params,
}: {
  params: { workoutId: number };
}) {
  const [drawOpen, setDrawOpen] = useState(false);
  const { fetchWorkoutData, updateWorkoutPlan } = useWorkout();
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const fetch = async () => {
      const workout = await fetchWorkoutData(params.workoutId);
      setWorkout(workout);
    };
    fetch();
  }, []);

  const onAddExerciseClick = async (exerciseId: number) => {
    const defaultExerciseSetup = { exerciseId, sets: 3, reps: "8-12" };
    await updateWorkoutPlan({
      workoutId: params.workoutId,
      exercises: [...(workout?.exercises || []), defaultExerciseSetup],
    });

    setWorkout((prev) => {
      if (prev) {
        return {
          ...prev,
          exercises: [...(prev?.exercises || []), defaultExerciseSetup],
        };
      }
    });
  };

  return (
    <div>
      <PageInfoPortal>
        <WorkoutPageInfo />
      </PageInfoPortal>
      <AddExerciseDrawer
        drawOpen={drawOpen}
        setDrawOpen={setDrawOpen}
        onClickMuscle={onAddExerciseClick}
        filterOutExercisesIds={
          workout?.exercises.map((e) => e.exerciseId) || []
        }
      />
      {workout?.exercises.map((e) => {
        return <div>{e.exerciseId}</div>;
      })}
      <AddButton title="+ Add Exercise" onClick={() => setDrawOpen(true)} />
    </div>
  );
}

function WorkoutPageInfo() {
  return (
    <Space className="pt-4" direction="vertical">
      <h1 className="text-2xl font-bold">Workout templates</h1>
      <p className="text-gray-500 pb-2">
        You can apply workout templates by clicking on the template buttons
        below. This will overwrite all of the exercises for this current workout
        plan, or you can stick with your custom workout plan
      </p>
      <Radio.Group defaultValue="4" buttonStyle="solid">
        <Radio.Button value="1">Upper/Lower 4x week</Radio.Button>
        <Radio.Button value="2">Push Pull Legs 5x week</Radio.Button>
        <Radio.Button value="3">Push Pull Legs 6x week</Radio.Button>
        <Radio.Button value="4">Custom</Radio.Button>
      </Radio.Group>
    </Space>
  );
}
