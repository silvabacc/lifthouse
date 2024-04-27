"use client";

import { Button, Layout, Modal, Radio, Space } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { useState } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/drawers/addExerciseDrawer";
import { useWorkout } from "../hooks/useWorkout";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { Record } from "./components/drawers/recordDrawer";
import dynamic from "next/dynamic";
import { useWorkoutIdContext } from "./context";
import ChangeExercisesDrawer from "./components/drawers/changeExercisesDrawer";
import TemplateDrawer from "./components/drawers/templateDrawer";

const Charts = dynamic(() => import("./charts"));

const { Content, Footer } = Layout;

export default function WorkoutPlanPage() {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [drawOpen, setDrawOpen] = useState(false);
  const { updateWorkoutPlan, updateTemplate } = useWorkout();
  const [showRecord, setShowRecord] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);

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

  return (
    <PageAnimation
      className={`${workout.exercises.length === 0 ? "" : "h-full"}`}
    >
      <Layout className="relative h-full">
        <Content className="h-full bg-white rounded-sm p-4">
          <PageInfoPortal
            title={workout.name}
            extra={
              <PageInfoExtra
                onClickRecord={() => setShowRecord(!showRecord)}
                onClickEdit={() => setShowEdit(!showEdit)}
                onClickWorkoutTemplate={() => setShowTemplate(!showTemplate)}
              />
            }
          />
          <AddExerciseDrawer
            drawOpen={drawOpen}
            setDrawOpen={setDrawOpen}
            onClickMuscle={onAddExerciseClick}
            filterOutExercisesIds={
              workout.exercises.map((e) => e.exerciseId) || []
            }
          />
          <ChangeExercisesDrawer
            show={showEdit}
            onCancel={() => setShowEdit(false)}
          />
          <TemplateDrawer
            template={workout.template}
            show={showTemplate}
            onCancel={() => setShowTemplate(false)}
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
  onClickRecord: () => void;
  onClickEdit: () => void;
  onClickWorkoutTemplate: () => void;
};
function PageInfoExtra({
  onClickRecord,
  onClickEdit,
  onClickWorkoutTemplate,
}: Props) {
  return (
    <Space className="pb-4">
      <Button type="dashed" danger onClick={onClickRecord}>
        Record a workout
      </Button>
      <Button type="dashed" className="text-sky-500" onClick={onClickEdit}>
        Change exercises
      </Button>
      <Button type="dashed" onClick={onClickWorkoutTemplate}>
        Workout templates
      </Button>
    </Space>
  );
}
