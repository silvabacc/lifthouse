import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Input, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useExercises } from "../../hooks/useExercise";
import { IntensityRepRange, VolumeRepRange } from "../utils";

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

  const repRangeSchemeMapping = {
    [WorkoutTemplate.lower_intensity]: IntensityRepRange,
    [WorkoutTemplate.upper_intensity]: IntensityRepRange,
    [WorkoutTemplate.lower_volume]: VolumeRepRange,
    [WorkoutTemplate.upper_volume]: VolumeRepRange,
  };

  const repSchemeOptions = (
    repRangeSchemeMapping[
      workout.template as keyof typeof repRangeSchemeMapping
    ] || [...VolumeRepRange, ...IntensityRepRange]
  ).map((r) => ({
    label: `${r.sets} x ${r.reps}`,
    value: `${r.sets} x ${r.reps}`,
  }));

  const exerciseOptions = exercises.map((e) => ({
    label: e.name,
    value: e.exerciseId,
  }));

  //Add skeleton here
  if (exerciseOptions.length === 0) return null;

  return (
    <div className="flex flex-col w-full p-4">
      {workout.exercises.map((exercise) => {
        return (
          <Space key={exercise.exerciseId}>
            <Select
              style={{ width: 150 }}
              defaultValue={exerciseOptions.find(
                (e) => e.value === exercise.exerciseId
              )}
              options={exerciseOptions}
            />
            <Select
              style={{ width: 100 }}
              defaultValue={repSchemeOptions.find(
                (r) => r.value === `${exercise.sets} x ${exercise.reps}`
              )}
              options={repSchemeOptions}
            />
          </Space>
        );
      })}
    </div>
  );
}
