"use client";

import { Button, Layout, Modal, Radio, Space, Tabs } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { useState } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/addExerciseDrawer";
import { useWorkout } from "../hooks/useWorkout";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { templateName } from "./utils";
import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { Record } from "./record";
import dynamic from "next/dynamic";
import { useWorkoutIdContext } from "./context";

const Charts = dynamic(() => import("./charts"));

const { Content, Footer } = Layout;

export default function WorkoutPlanPage() {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [drawOpen, setDrawOpen] = useState(false);
  const { updateWorkoutPlan, updateTemplate } = useWorkout();
  const [showRecord, setShowRecord] = useState(false);

  const onAddExerciseClick = async (exerciseId: number) => {
    const defaultExerciseSetup = { exerciseId, sets: 3, reps: "8-12" };
    await updateWorkoutPlan({
      workoutId: workout.workoutId,
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
      content: "This may overwrite your current workout plan",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        const updatedData = await updateTemplate(workout.workoutId, value);
        setWorkout(updatedData);
      },
    });
  };

  return (
    <PageAnimation
      className={`${workout.exercises.length === 0 ? "" : "h-full"}`}
    >
      <Layout className="relative h-full">
        <Content className="h-full bg-white rounded-sm overflow-auto p-4  ">
          <PageInfoPortal
            title="Workout templates"
            extra={<RecordButton onClick={() => setShowRecord(!showRecord)} />}
          >
            <WorkoutPageInfo onClickWorkoutType={onClickWorkoutType} />
          </PageInfoPortal>
          <AddExerciseDrawer
            drawOpen={drawOpen}
            setDrawOpen={setDrawOpen}
            onClickMuscle={onAddExerciseClick}
            filterOutExercisesIds={
              workout.exercises.map((e) => e.exerciseId) || []
            }
          />
          {
            <Record
              show={showRecord}
              onCancel={() => {
                setShowRecord(false);
              }}
            />
          }
          <Charts />
        </Content>
        <Footer className="p-0 mt-4">
          {workout?.template === WorkoutTemplate.custom && (
            <AddButton
              title="+ Add Exercise"
              onClick={() => setDrawOpen(true)}
            />
          )}
        </Footer>
      </Layout>
    </PageAnimation>
  );
}

type Props = {
  onClick: () => void;
};
function RecordButton({ onClick }: Props) {
  return (
    <Button type="dashed" danger className="mt-4 m-0" onClick={onClick}>
      Record a workout
    </Button>
  );
}

function WorkoutPageInfo({
  onClickWorkoutType,
}: {
  onClickWorkoutType: (value: WorkoutTemplate) => void;
}) {
  const {
    workout: { template },
  } = useWorkoutIdContext();
  return (
    <Space className="pt-2" direction="vertical">
      <p className="text-gray-500 pb-2">
        You can apply workout templates by clicking on the template buttons
        below. This will overwrite all of the exercises for this current workout
        plan, or you can stick with your custom workout plan
      </p>
      <Radio.Group
        value={template}
        buttonStyle="solid"
        onChange={(value) =>
          onClickWorkoutType(value.target.value as WorkoutTemplate)
        }
      >
        {/* Can add more templates */}
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
