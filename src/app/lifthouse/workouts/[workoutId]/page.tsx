"use client";

import { Button, Layout, Space } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { useState, useTransition } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/drawers/addExerciseDrawer";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { Record } from "./components/drawers/recordDrawer";
import { useWorkoutIdContext } from "./context";
import ChangeExercisesDrawer from "./components/drawers/changeExercisesDrawer";
import TemplateDrawer from "./components/drawers/templateDrawer";
import Charts from "./charts";
import { updateWorkoutExercises } from "../actions";

const { Content, Footer } = Layout;

export default function WorkoutPlanPage() {
  const { workout, setWorkout } = useWorkoutIdContext();
  const [drawOpen, setDrawOpen] = useState(false);
  const [showRecord, setShowRecord] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showTemplate, setShowTemplate] = useState(false);
  const [, startTransition] = useTransition();

  const onAddExercise = (exerciseId: number) => {
    const defaultSetup = { exerciseId, sets: 3, reps: "8-12" };
    const newExercises = [...(workout.exercises || []), defaultSetup];
    startTransition(async () => {
      setWorkout({ ...workout, exercises: newExercises });
      await updateWorkoutExercises(workout.workoutId, newExercises);
    });
    setDrawOpen(false);
  };

  return (
    <PageAnimation className={workout.exercises.length === 0 ? "" : "h-full"}>
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
            onClickMuscle={onAddExercise}
            filterOutExercisesIds={workout.exercises.map((e) => e.exerciseId)}
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
          <Record show={showRecord} onCancel={() => setShowRecord(false)} />
          <Charts />
        </Content>
        <Footer className="mt-4" style={{ padding: 0 }}>
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

type PageInfoExtraProps = {
  onClickRecord: () => void;
  onClickEdit: () => void;
  onClickWorkoutTemplate: () => void;
};

function PageInfoExtra({
  onClickRecord,
  onClickEdit,
  onClickWorkoutTemplate,
}: PageInfoExtraProps) {
  return (
    <Space className="pb-4">
      <Button type="dashed" danger onClick={onClickRecord}>
        Record a workout
      </Button>
      <Button type="dashed" style={{ color: "#0ea5e9" }} onClick={onClickEdit}>
        Change exercises
      </Button>
      <Button type="dashed" onClick={onClickWorkoutTemplate}>
        Workout templates
      </Button>
    </Space>
  );
}
