import { LogEntry, RoutineExercise } from "@backend/types";
import { Card, Collapse, Divider, Tabs, Typography } from "antd";
import React, { useEffect, useState } from "react";
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
  const [historyData, setHistoryData] = useState<LogEntry[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (page % 2 === 0) {
      const fetch = async () => {
        const exerciseIds = workoutData.routine.exercises.map(
          (e) => e.exerciseId
        );
        const { data } = await getExerciseHistory(exerciseIds, page, 2);
        setHistoryData((prev) => [...prev, ...data]);
      };
      fetch();
    }
  }, [page]);

  useEffect(() => {
    if (workoutData) {
      const fetch = async () => {
        const exerciseIds = workoutData.routine.exercises.map(
          (e) => e.exerciseId
        );
        const { data } = await getExerciseHistory(exerciseIds, page, 2);
        setHistoryData(data);
      };
      fetch();
    }
  }, [workoutData]);

  return (
    <>
      {isLoading && <SkeletonContent />}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        const history = historyData.filter(
          (entry) =>
            parseInt(entry.exerciseId) === parseInt(routineExercise.exerciseId)
        )[0];

        return (
          <Card
            style={{ margin: 16 }}
            title={<ExerciseTitle routineExercise={routineExercise} />}
            key={`${routineExercise.exerciseId}-${idx}`}
          >
            <div style={{ display: "flex" }}>
              <SetsRepsSteps
                exercise={routineExercise}
                exerciseHistory={history}
              />
              <Divider style={{ margin: 16, height: 300 }} type="vertical" />
              <History
                page={page}
                onPageChange={setPage}
                history={historyData}
              />
            </div>
            <div style={{ flex: 1 }}>Charts</div>
          </Card>
        );
      })}
    </>
  );
};

const PanelContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();
  const [page, setPage] = useState(0);

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
            children: (
              <History
                page={page}
                onPageChange={setPage}
                exerciseId={routineExercise.exerciseId}
              />
            ),
          },
          {
            label: "Charts",
            key: "3",
            children: "Not Implemented Yet",
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
  const { workoutData } = useWorkoutContext();
  const title = workoutData.exercises.find(
    (e) => e.exerciseId === routineExercise.exerciseId
  )?.exerciseName;

  return (
    <div
      style={{ display: "flex", alignItems: "center", fontWeight: "normal" }}
    >
      <Text style={{ flex: 1 }} strong>
        {title}
      </Text>
      <Divider type="vertical" style={{ height: 30 }} />
      <div>
        <Text keyboard>{routineExercise.sets}</Text> x{" "}
        <Text keyboard>{routineExercise.reps}</Text>
      </div>
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
