import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Button, DatePicker, Divider, Space } from "antd";
import { useEffect, useState } from "react";
import { useExercises } from "../../hooks/useExercise";
import {
  acceptedExerciseTypesForExercises,
  formatValue,
  getButtonType,
  getRepScheme,
  intersection,
} from "../utils";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import SelectElement from "./selectComponent";
import ExerciseCardSkeleton from "./exerciseCard.skeleton";
import dayjs from "dayjs";
import StackedChart from "./visuals/stacked";
import LineChart from "./visuals/line";
import Table from "./visuals/table";

const { RangePicker } = DatePicker;

export enum View {
  line = "line",
  stacked = "stacked",
  table = "table",
}

type ExerciseCardProps = {
  workout: Workout;
};
export default function ExerciseCard({ workout }: ExerciseCardProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { exercises } = useExercises();
  const { fetch } = useFetch();
  const [firstDate, setFirstDate] = useState(dayjs().subtract(30, "day"));
  const [secondDate, setSecondDate] = useState(dayjs());
  const [view, setView] = useState<View>(View.table);

  const fetchLogs = async () => {
    const response: LogEntry[] = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({
        exerciseIds: workout.exercises.map((e) => e.exerciseId),
        startFrom: firstDate,
        endOn: secondDate,
      }),
    });

    setLogs(response);
  };

  useEffect(() => {
    if (secondDate > firstDate) {
      fetchLogs();
    }
  }, [firstDate, secondDate]);

  if (exercises.length === 0) {
    return <ExerciseCardSkeleton />;
  }

  const repSchemeOptions = getRepScheme(workout.template).map((r) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full p-4">
      {workout.exercises.map((exercise) => {
        const findExercise = exercises.find(
          (e) => e.exerciseId === exercise.exerciseId
        );

        //With the current exercise selection, find all relevant exercises
        //This is done via searching the exercise types
        const filteredExercisesWithType = exercises
          .filter((e) =>
            intersection(e.exerciseType, findExercise?.exerciseType ?? [])
          )
          .filter((e) =>
            intersection(
              e.exerciseType,
              acceptedExerciseTypesForExercises(workout.template)
            )
          );

        //We only want to apply the exercises if a template is applied
        const options = (
          workout.template !== WorkoutTemplate.custom
            ? filteredExercisesWithType
            : exercises
        ).map((e) => ({ value: e.exerciseId, label: e.name }));

        return (
          <div key={exercise.exerciseId}>
            <div className="flex flex-wrap justify-between">
              <Space className="flex-wrap">
                <SelectElement
                  defaultValue={exercise.exerciseId}
                  options={options}
                />
                <SelectElement
                  options={repSchemeOptions}
                  defaultValue={formatValue(exercise.sets, exercise.reps)}
                />
              </Space>
              <div>
                <Button
                  className="p-0"
                  type={getButtonType(view, View.stacked)}
                  onClick={() => setView(View.stacked)}
                >
                  Stacked
                </Button>
                <Divider type="vertical" />
                <Button
                  className="p-0"
                  type={getButtonType(view, View.line)}
                  onClick={() => setView(View.line)}
                >
                  Line
                </Button>
                <Divider type="vertical" />
                <Button
                  className="p-0"
                  type={getButtonType(view, View.table)}
                  onClick={() => setView(View.table)}
                >
                  Table
                </Button>
                <Divider type="vertical" />
                <RangePicker
                  format={(value) => value.format("DD/MM/YYYY")}
                  onChange={(dates) => {
                    if (dates?.[0] && dates[0] !== firstDate) {
                      setFirstDate(dates?.[0]);
                    }
                    if (dates?.[1] && dates[1] !== secondDate) {
                      setSecondDate(dates?.[1]);
                    }
                  }}
                  placement="bottomLeft"
                  defaultValue={[secondDate, firstDate]}
                />
              </div>
              <div style={{ width: "100%" }}>
                {view === View.stacked && (
                  <StackedChart
                    data={logs.filter(
                      (l) => l.exerciseId === exercise.exerciseId
                    )}
                  />
                )}
                {view === View.line && (
                  <LineChart
                    data={logs.filter(
                      (l) => l.exerciseId === exercise.exerciseId
                    )}
                  />
                )}
                {view === View.table && (
                  <Table
                    data={logs.filter(
                      (l) => l.exerciseId === exercise.exerciseId
                    )}
                    exercises={exercises}
                  />
                )}
              </div>
              <Divider />
            </div>
          </div>
        );
      })}
    </BottomFadeInAnimation>
  );
}
