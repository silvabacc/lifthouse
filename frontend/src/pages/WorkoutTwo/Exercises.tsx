import { Exercise, RoutineExercise } from "@backend/types";
import { Card, Collapse, Divider, MenuProps, Select, Typography } from "antd";
import React from "react";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";
import { useWorkoutContext } from "./WorkoutContext";
import { SetsRepsSteps } from "./components/SetsRepsSteps";
import History from "./components/History";
import { useWorkout } from "./useWorkout";

const { Text } = Typography;
const { Panel } = Collapse;

export const Exercises: React.FC = () => {
  const { isMobile } = useScreen();

  const ExerciseCardContent = isMobile ? PanelContent : FullContent;

  return <ExerciseCardContent />;
};

const FullContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();
  const { getExerciseHistory } = useWorkout();

  const exerciseIds = workoutData.routine.exercises.map((e) => e.exerciseId);
  const { data: historyData } = getExerciseHistory(exerciseIds, 0, 10);

  console.log("historyData", historyData);

  return (
    <>
      {isLoading && <SkeletonFullContent />}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        const history = historyData?.find(
          (entry) =>
            parseInt(entry.exerciseId) === parseInt(routineExercise.exerciseId)
        );

        return (
          <Card
            style={{ margin: 16 }}
            title={<ExerciseTitle routineExercise={routineExercise} />}
            key={`${routineExercise.exerciseId}-${idx}`}
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {/* If on mobile, fetch all exercise history in routine, otherwise singular*/}
                {/* Fetch the data on the parent */}
                <SetsRepsSteps
                  exercise={routineExercise}
                  exerciseHistory={history}
                />
              </div>
              <Divider style={{ height: 200 }} type="vertical" />
              <History history={history} />
            </div>
          </Card>
        );
      })}
    </>
  );
};

const PanelContent: React.FC = () => {
  const { workoutData } = useWorkoutContext();

  return (
    <>
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        <Collapse>
          <Panel header={<ExerciseTitle routineExercise={routineExercise} />}>
            <div></div>
          </Panel>
        </Collapse>;
      })}
    </>
  );
};

interface ExerciseTitleProps {
  routineExercise: RoutineExercise;
}

const ExerciseTitle: React.FC<ExerciseTitleProps> = ({ routineExercise }) => {
  const { workoutData } = useWorkoutContext();
  const title = workoutData.exercises.find(
    (e) => e.exerciseId === routineExercise.exerciseId
  )?.exerciseName;

  return (
    <div
      style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}
    >
      <Text strong>{title}</Text>
      <Divider type="vertical" style={{ height: 30 }} />
      <div>
        <Text keyboard>{routineExercise.sets}</Text> x{" "}
        <Text keyboard>{routineExercise.reps}</Text>
      </div>
    </div>
  );
};

export const SkeletonFullContent: React.FC = () => {
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
          <Skeleton active paragraph={{ rows: 8 }} />
        </div>
      ))}
    </>
  );
};
