import { useFetch } from "@/app/hooks/useFetch";
import {
  ExerciseType,
  LogEntry,
  Workout,
  WorkoutTemplate,
} from "@/lib/supabase/db/types";
import { Button, Input, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useExercises } from "../../hooks/useExercise";
import { IntensityRepRange, VolumeRepRange } from "../utils";
import { FadeInAnimation } from "@/app/aniamtions/fadeInAnimation";
import SelectElement from "./selectComponent";

type ExerciseCardProps = {
  workout: Workout;
};
export default function ExerciseCard({ workout }: ExerciseCardProps) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { exercises } = useExercises();
  const { fetch } = useFetch();
  const today = new Date();
  const lastWeek = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() - 7
  );

  useEffect(() => {
    const fetchLogs = async () => {
      const response: LogEntry[] = await fetch(`/api/logs`, {
        method: "POST",
        body: JSON.stringify({
          exerciseIds: workout.exercises.map((e) => e.exerciseId),
          startFrom: lastWeek,
          endOn: today,
        }),
      });

      setLogs(response);
    };

    if (workout.exercises.length !== 0) {
      fetchLogs();
    }
  }, []);

  // Templates can change the rep schemes
  const repRangeSchemeMapping = {
    [WorkoutTemplate.lower_intensity]: IntensityRepRange,
    [WorkoutTemplate.upper_intensity]: IntensityRepRange,
    [WorkoutTemplate.lower_volume]: VolumeRepRange,
    [WorkoutTemplate.upper_volume]: VolumeRepRange,
  };

  const formatValue = (sets: number, reps: string) => `${sets}-${reps}`;

  // If the template is not found, use the both rep scheme
  const repSchemeOptions = (
    repRangeSchemeMapping[
      workout.template as keyof typeof repRangeSchemeMapping
    ] || [...VolumeRepRange, ...IntensityRepRange]
  ).map((r) => ({
    label: `${r.sets} x ${r.reps}`,
    value: formatValue(r.sets, r.reps),
  }));

  const exerciseOptions = exercises.map((e) => ({
    label: e.name,
    value: e.exerciseId,
  }));

  //Add skeleton here
  if (exerciseOptions.length === 0) return <>Skeleton</>;

  return (
    <FadeInAnimation className="flex flex-col w-full p-4">
      {workout.exercises.map((exercise) => {
        return (
          <div key={exercise.exerciseId}>
            <Space className="flex flex-wrap">
              <SelectElement
                defaultValue={exercise.exerciseId}
                options={exerciseOptions}
              />
              <SelectElement
                options={repSchemeOptions}
                defaultValue={formatValue(exercise.sets, exercise.reps)}
              />
            </Space>
            <div>Chart</div>
          </div>
        );
      })}
    </FadeInAnimation>
  );
}
