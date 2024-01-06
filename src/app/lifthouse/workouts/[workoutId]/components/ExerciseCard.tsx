import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, Workout, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Button, Input, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useExercises } from "../../hooks/useExercise";
import { IntensityRepRange, VolumeRepRange } from "../utils";
import { FadeInAnimation } from "@/app/aniamtions/fadeInAnimation";
import { DownOutlined } from "@ant-design/icons";

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

type SelectProps = {
  options: { label: string; value: string | number }[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
};
function SelectElement({ options, defaultValue, onChange }: SelectProps) {
  const [expanded, setExpnaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const findOption = (value?: string | number) =>
    options.find((o) => o.value === value);

  const [optionSelected, setOptionSelected] = useState(
    findOption(defaultValue) ?? options[0]
  );

  const onClick = () => setExpnaded(!expanded);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setExpnaded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center cursor-pointer justify-between border border-slate-200 p-1 rounded-lg"
        onClick={onClick}
      >
        <p className="pr-2">{optionSelected.label}</p>
        <DownOutlined />
      </div>
      {expanded && (
        <div className="absolute z-10 bg-white border border-slate-200 overflow-auto h-64 w-64">
          {options.map((o) => {
            return (
              <div
                onClick={() => {
                  setOptionSelected(o);
                  setExpnaded(false);
                  onChange?.(o.value);
                }}
                className="p-1 cursor-pointer hover:bg-slate-100"
                key={o.value}
              >
                {o.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
