import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Button, DatePicker, Divider, Space } from "antd";
import { useEffect, useState } from "react";
import { useExercises } from "../../hooks/useExercise";
import {
  acceptedExerciseTypesForExercises,
  formatValue,
  getRepScheme,
  intersection,
} from "../utils";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import SelectElement from "./selectComponent";
import ExerciseCardSkeleton from "./exerciseCard.skeleton";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

type ExerciseCardProps = {
  workout: Workout;
};
export default function ExerciseCard({ workout }: ExerciseCardProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { exercises } = useExercises();
  const { fetch } = useFetch();
  const [firstDate, setFirstDate] = useState(dayjs());
  const [secondDate, setSecondDate] = useState(dayjs().subtract(7, "day"));

  useEffect(() => {
    const fetchLogs = async () => {
      const response: LogEntry[] = await fetch(`/api/logs`, {
        method: "POST",
        body: JSON.stringify({
          exerciseIds: workout.exercises.map((e) => e.exerciseId),
          startFrom: secondDate,
          endOn: firstDate,
        }),
      });

      setLogs(response);
    };

    if (workout.exercises.length !== 0) {
      fetchLogs();
    }
  }, []);

  if (exercises.length === 0) {
    return <ExerciseCardSkeleton />;
  }

  const repSchemeOptions = getRepScheme(workout.template).map((r) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  return (
    <BottomFadeInAnimation className="flex flex-col w-full p-4">
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
                <Button className="p-0" type="link">
                  Line
                </Button>
                <Divider type="vertical" />
                <Button className="p-0" type="link">
                  Bar
                </Button>
                <Divider type="vertical" />
                <RangePicker
                  placement="bottomLeft"
                  defaultValue={[secondDate, firstDate]}
                />
              </div>
            </div>
            <div>Chart</div>
          </div>
        );
      })}
    </BottomFadeInAnimation>
  );
}
