import { Exercise, RoutineExercise } from "@backend/types";
import {
  Card,
  Collapse,
  Divider,
  Layout,
  Select,
  Tabs,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";
import { useWorkoutContext } from "./WorkoutContext";
import { SetsRepsSteps } from "./components/SetsRepsSteps";
import History from "./components/History";
import WorkoutButton from "./components/WorkoutButton";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useNavigate } from "react-router";
import { useWorkout } from "./useWorkout";
import styled from "styled-components";
import colors from "@frontend/theme/colors";

const { Text } = Typography;
const { Panel } = Collapse;
const { Content, Footer } = Layout;

export const Exercises: React.FC = () => {
  const { isMobile } = useScreen();
  const [saving, setSaving] = useState(false);
  const { clearTemporaryStorage } = useTemporaryStorage();
  const navigate = useNavigate();
  const { logEntry } = useWorkout();
  const { workoutData } = useWorkoutContext();

  const finishWorkout = async () => {
    setSaving(true);
    const saved = await logEntry(workoutData.exercises);
    if (saved) {
      clearTemporaryStorage();
      navigate("/");
      setSaving(false);
    }
  };

  const ExerciseCardContent = isMobile ? PanelContent : FullContent;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>
        <ExerciseCardContent />
      </Content>
      <Footer>
        <div
          style={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            background: "white",
            position: "fixed",
            right: 0,
            bottom: 0,
            borderTop: `0.1px solid ${colors.grey}`,
            paddingRight: 16,
            width: "100%",
          }}
        >
          <WorkoutButton
            type={saving ? "default" : "primary"}
            onClick={() => {
              finishWorkout();
            }}
          >
            {saving ? "Saving..." : "Finish Workout"}
          </WorkoutButton>
        </div>
      </Footer>
    </Layout>
  );
};

const FullContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();

  return (
    <>
      {isLoading && <SkeletonContent />}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        return (
          <Card
            style={{ margin: 16 }}
            title={<ExerciseTitle routineExercise={routineExercise} />}
            key={`${routineExercise.exerciseId}-${idx}`}
          >
            <div style={{ display: "flex" }}>
              <SetsRepsSteps exercise={routineExercise} />
              <Divider style={{ margin: 16, height: 300 }} type="vertical" />
              <History exerciseId={routineExercise.exerciseId} />
            </div>
            {/* <PerformanceChart exerciseId={routineExercise.exerciseId} /> */}
          </Card>
        );
      })}
    </>
  );
};

const PanelContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();

  return (
    <>
      {isLoading && <SkeletonContent rows={1} />}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        const items = [
          {
            label: "Sets",
            key: "1",
            children: <SetsRepsSteps exercise={routineExercise} />,
          },
          {
            label: "History",
            key: "2",
            children: <History exerciseId={routineExercise.exerciseId} />,
          },
          {
            label: "Charts",
            key: "3",
            children: "Not Implemented Yet",
            // children: (
            //   <PerformanceChart exerciseId={routineExercise.exerciseId} />
            // ),
          },
        ];

        return (
          <Collapse
            key={`${routineExercise.exerciseId}-${idx}`}
            style={{ margin: 16 }}
          >
            <Panel
              key={`${routineExercise.exerciseId}-${idx}`}
              header={<ExerciseTitle routineExercise={routineExercise} />}
            >
              <Tabs items={items} />
            </Panel>
          </Collapse>
        );
      })}
    </>
  );
};

interface ExerciseTitleProps {
  routineExercise: RoutineExercise;
}

const ExerciseTitle: React.FC<ExerciseTitleProps> = ({ routineExercise }) => {
  const { workoutData, setWorkoutData, isEditing } = useWorkoutContext();
  const { queryExercises } = useWorkout();
  const { data: allExercises = [], refetch: fetchQueryExercises } =
    queryExercises();
  const { clearTemporaryStorageForExercise } = useTemporaryStorage();

  const title = workoutData.exercises.find(
    (e) => e.exerciseId === routineExercise.exerciseId
  )?.exerciseName;

  useEffect(() => {
    if (isEditing) {
      fetchQueryExercises();
    }
  }, [isEditing]);

  const onExerciseChange = (exerciseId: string) => {
    const updatedExercise = allExercises.find(
      (e) => e.exerciseId === exerciseId
    );

    if (!updatedExercise) return;

    const exerciseIndex = workoutData.exercises.findIndex((e) => {
      return e.exerciseId === routineExercise.exerciseId;
    });

    const exercises = workoutData.exercises.slice();
    exercises[exerciseIndex] = updatedExercise;

    const exerciseIds = exercises.map((e) => ({
      sets: routineExercise.sets,
      reps: routineExercise.reps,
      exerciseId: e.exerciseId,
    }));

    clearTemporaryStorageForExercise(routineExercise.exerciseId);
    setWorkoutData({
      routine: { ...workoutData.routine, exercises: exerciseIds },
      exercises,
    });
  };

  const exerciseInfo = allExercises.find(
    (exerciseFromList) =>
      exerciseFromList.exerciseId === routineExercise.exerciseId
  );

  const exercisesWithType = allExercises
    //Filters exercises by type e.g. Vertical Push, Horizontal Push, etc
    .filter(
      (exerciseFromList) =>
        exerciseInfo?.exerciseType === exerciseFromList.exerciseType
    )
    //Removes any duplicated exercises from the list if already in the routine
    .filter(
      (exerciseFromList) =>
        !workoutData.exercises
          .map((i) => i.exerciseId)
          .includes(exerciseFromList.exerciseId)
    )
    //Maps the exercises to the format required by the Select component
    .map((exerciseFromList) => ({
      value: exerciseFromList.exerciseId,
      label: exerciseFromList.exerciseName,
    }))
    //Sorts the exercises alphabetically
    .sort((a, b) => a.label.localeCompare(b.label));

  const TitleContent = isEditing ? (
    <>
      <Select
        bordered={false}
        filterOption={(input, option) =>
          option
            ? option?.label
                .toLocaleLowerCase()
                .indexOf(input.toLocaleLowerCase()) >= 0
            : false
        }
        onChange={(value) => onExerciseChange(value as string)}
        showSearch
        value={exerciseInfo?.exerciseName}
        options={exercisesWithType}
      />
    </>
  ) : (
    <>
      <Text style={{ flex: 1 }} strong>
        {title}
      </Text>
      <Divider type="vertical" style={{ height: 30 }} />
      <div>
        <Text keyboard>{routineExercise.sets}</Text> x{" "}
        <Text keyboard>{routineExercise.reps}</Text>
      </div>
    </>
  );

  return (
    <div
      style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}
    >
      {TitleContent}
    </div>
  );
};

type SkeletonContentProps = {
  rows?: number;
};
export const SkeletonContent: React.FC<SkeletonContentProps> = ({
  rows = 8,
}) => {
  return (
    <>
      {Array.from(Array(12)).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          style={{
            borderStyle: "solid",
            borderColor: "#f0f0f0",
            padding: 16,
            margin: 16,
          }}
        >
          <Skeleton active paragraph={{ rows }} />
        </div>
      ))}
    </>
  );
};

export const FinishWorkoutFooter = styled.div`
  border-top: 0.1px solid ${colors.grey};
  background: white;
  width: 100%;
  position: fixed;
  right: 0;
  bottom: 0;
`;
