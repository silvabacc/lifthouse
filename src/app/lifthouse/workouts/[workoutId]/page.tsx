"use client";

import { Button, Modal, Radio, Space } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { use, useEffect, useState } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/addExerciseDrawer";
import { useWorkout } from "../useWorkout";
import { Exercise, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { defaultExercisesForTemplates, templateName } from "./utils";
import { useFetch } from "@/app/hooks/useFetch";

export default function WorkoutPlanPage({
  params,
}: {
  params: { workoutId: number };
}) {
  const [drawOpen, setDrawOpen] = useState(false);
  const { fetchWorkoutData, updateWorkoutPlan, updateTemplate } = useWorkout();
  const [loading, isLoading] = useState(false);
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    const fetch = async () => {
      isLoading(true);
      const workout = await fetchWorkoutData(params.workoutId);
      setWorkout(workout);
      isLoading(false);
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

  const onClickWorkoutType = (value: WorkoutTemplate) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This will overwrite your current workout plan",
      okText: "Yes",
      cancelText: "No",
      onOk: () => {
        const updatedData = updateTemplate(params.workoutId, value);
        setWorkout((prev) => {
          if (prev) {
            return { ...prev, template: value };
          }
        });
      },
    });
  };

  if (loading) return <div>Skeleton</div>;

  return (
    <div>
      <PageInfoPortal>
        <WorkoutPageInfo
          value={workout?.template}
          onClickWorkoutType={onClickWorkoutType}
        />
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
        return <div key={e.exerciseId}>{e.exerciseId}</div>;
      })}
      {workout?.template === WorkoutTemplate.custom && (
        <AddButton title="+ Add Exercise" onClick={() => setDrawOpen(true)} />
      )}
    </div>
  );
}

function WorkoutPageInfo({
  value,
  onClickWorkoutType,
}: {
  value?: WorkoutTemplate;
  onClickWorkoutType: (value: WorkoutTemplate) => void;
}) {
  return (
    <Space className="pt-4" direction="vertical">
      <h1 className="text-2xl font-bold">Workout templates</h1>
      <p className="text-gray-500 pb-2">
        You can apply workout templates by clicking on the template buttons
        below. This will overwrite all of the exercises for this current workout
        plan, or you can stick with your custom workout plan
      </p>
      <Radio.Group
        value={value}
        buttonStyle="solid"
        onChange={(value) =>
          onClickWorkoutType(value.target.value as WorkoutTemplate)
        }
      >
        {Object.values(WorkoutTemplate).map((template) => {
          return (
            <Radio.Button key={template} value={template}>
              {templateName[template] || template}
            </Radio.Button>
          );
        })}
      </Radio.Group>
    </Space>
  );
}
