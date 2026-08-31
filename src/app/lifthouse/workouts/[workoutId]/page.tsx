"use client";

import { Button, Layout } from "antd";
import {
  PlayCircleFilled,
  SwapOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { PageInfoPortal } from "../../components/pageInfo";
import { useState } from "react";
import AddButton from "../components/addButton";
import AddExerciseDrawer from "./components/drawers/addExerciseDrawer";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
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

  const onAddExercise = (exerciseId: number) => {
    const defaultSetup = { exerciseId, sets: 3, reps: "8-12" };
    const newExercises = [...(workout.exercises || []), defaultSetup];
    setWorkout({ ...workout, exercises: newExercises });
    setDrawOpen(false);
    updateWorkoutExercises(workout.workoutId, newExercises);
  };

  return (
    <div className={workout.exercises.length === 0 ? "" : "h-full"}>
      <Layout className="relative h-full">
        <Content className="h-full bg-white rounded-xl p-4">
          <PageInfoPortal
            title={workout.name}
            extra={
              <PageInfoExtra
                hasExercises={workout.exercises.length > 0}
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
        <Footer className="my-4" style={{ padding: 0 }}>
          {workout?.template === WorkoutTemplate.custom && (
            <AddButton
              title="+ Add Exercise"
              onClick={() => setDrawOpen(true)}
            />
          )}
        </Footer>
      </Layout>
    </div>
  );
}

type PageInfoExtraProps = {
  hasExercises: boolean;
  onClickRecord: () => void;
  onClickEdit: () => void;
  onClickWorkoutTemplate: () => void;
};

function PageInfoExtra({
  hasExercises,
  onClickRecord,
  onClickEdit,
  onClickWorkoutTemplate,
}: PageInfoExtraProps) {
  return (
    <div className="flex gap-2 pb-4">
      <Button
        type="primary"
        icon={<PlayCircleFilled />}
        disabled={!hasExercises}
        onClick={onClickRecord}
        className="shrink-0 snap-start"
      >
        Start workout
      </Button>
      <Button
        icon={<SwapOutlined />}
        onClick={onClickEdit}
        className="shrink-0 snap-start"
      >
        Edit exercises
      </Button>
      <Button
        icon={<AppstoreOutlined />}
        onClick={onClickWorkoutTemplate}
        className="shrink-0 snap-start"
      >
        Templates
      </Button>
    </div>
  );
}
