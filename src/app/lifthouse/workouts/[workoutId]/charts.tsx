import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Button, DatePicker, Divider, Space } from "antd";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { useExercises } from "../hooks/useExercise";
import {
  acceptedExerciseTypesForExercises,
  formatValue,
  getButtonType,
  getRepScheme,
  intersection,
} from "./utils";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import SelectElement from "./components/selectComponent";
import ExerciseCardSkeleton from "./components/exerciseCard.skeleton";
import dayjs from "dayjs";
import StackedChart from "./components/visuals/stacked";
import LineChart from "./components/visuals/line";
import Table from "./components/visuals/table";
import { useWorkout } from "../hooks/useWorkout";

const { RangePicker } = DatePicker;

export enum View {
  line = "line",
  stacked = "stacked",
  table = "table",
}

type ExerciseCardProps = {
  workout: Workout;
  setWorkout: Dispatch<SetStateAction<Workout | undefined>>;
};
export default function Charts({ workout, setWorkout }: ExerciseCardProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { updateWorkoutPlan } = useWorkout();
  const { exercises } = useExercises();
  const { fetch } = useFetch();
  const [firstDate, setFirstDate] = useState(dayjs().subtract(30, "day"));
  const [secondDate, setSecondDate] = useState(dayjs());
  const [view, setView] = useState<View>(View.stacked);
  const [loading, setLoading] = useState(false);

  const repSchemeOptions = getRepScheme(workout.template).map((r) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  const onChangeReps = async (exerciseId: number, value: string) => {
    const [sets, reps] = value.split(":");

    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          sets: parseInt(sets),
          reps: reps,
        };
      }
      return e;
    });

    const updatedWorkout = await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: newExercises,
    });

    if (!updatedWorkout) return;

    setWorkout(updatedWorkout);
  };

  const onChangeExercise = async (exerciseId: number, value: number) => {
    const newExercises = workout.exercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          exerciseId: value,
        };
      }
      return e;
    });

    const updatedWorkout = await updateWorkoutPlan({
      workoutId: workout.workoutId,
      exercises: newExercises,
    });

    if (!updatedWorkout) return;

    setWorkout(updatedWorkout);
  };

  const fetchLogs = async () => {
    if (loading) return;

    setLoading(true);
    const response: LogEntry[] = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({
        exerciseIds: workout.exercises.map((e) => e.exerciseId),
        startFrom: firstDate,
        endOn: secondDate,
      }),
    });
    setLoading(false);
    setLogs(response);
  };

  useEffect(() => {
    if (workout) {
      fetchLogs();
    }
  }, [workout]);

  useEffect(() => {
    if (secondDate > firstDate) {
      fetchLogs();
    }
  }, [firstDate, secondDate]);

  if (exercises.length === 0) {
    return <ExerciseCardSkeleton />;
  }

  if (loading) {
    return <ExerciseCardSkeleton />;
  }

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full">
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

        const data = logs.filter((l) => l.exerciseId === exercise.exerciseId);

        return (
          <div key={exercise.exerciseId}>
            <div className="flex flex-wrap justify-between">
              <Space className="flex-wrap">
                <SelectElement
                  defaultValue={exercise.exerciseId}
                  options={options}
                  onChange={(value) =>
                    onChangeExercise(exercise.exerciseId, value as number)
                  }
                />
                <SelectElement
                  options={repSchemeOptions}
                  onChange={(value) =>
                    onChangeReps(exercise.exerciseId, value as string)
                  }
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
                {view === View.stacked && <StackedChart data={data} />}
                {view === View.line && <LineChart data={data} />}
                {view === View.table && <Table data={data} />}
              </div>
              <Divider />
            </div>
          </div>
        );
      })}
    </BottomFadeInAnimation>
  );
}
