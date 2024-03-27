import {
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Select,
  Skeleton,
  Space,
} from "antd";
import CompleteFiveThreeOneModal from "./components/complete531";
import { useEffect, useState } from "react";
import { useFiveThreeOneContext } from "./context";
import { LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useFetch } from "@/app/hooks/useFetch";
import { View } from "../types";
import { getButtonType } from "../utils";
import dynamic from "next/dynamic";
import Progress531 from "./components/progress";

const StackedChart = dynamic(() => import("../components/logVisuals/stacked"));
const LineChart = dynamic(() => import("../components/logVisuals/line"));
const Table = dynamic(() => import("../components/logVisuals/table"));

export default function FiveThreeOneWeeks() {
  const { week } = useFiveThreeOneContext();

  const items: CollapseProps["items"] = [
    {
      title: "Week 1",
      sets: 3,
      reps: [5, 5, 5],
      intensity: [0.65, 0.75, 0.85],
    },
    { title: "Week 2", sets: 3, reps: [3, 3, 3], intensity: [0.7, 0.8, 0.9] },
    {
      title: "Week 3",
      sets: 3,
      reps: [5, 3, 1],
      intensity: [0.75, 0.85, 0.95],
    },
    { title: "Week 4", sets: 3, reps: [5, 5, 5], intensity: [0.4, 0.5, 0.6] },
  ].map((item, index) => ({
    key: index + 1,
    label: <h3 className="font-bold m-0">{item.title}</h3>,
    showArrow: false,
    children: (
      <ExerciseRow
        sets={item.sets}
        reps={item.reps}
        intensity={item.intensity}
      />
    ),
    collapsible: index + 1 !== week ? "disabled" : undefined,
  }));
  return <Collapse activeKey={week} className="mt-4" items={items} />;
}

type ExerciseRowProps = {
  sets: number;
  reps: number[];
  intensity: number[];
};
function ExerciseRow({ sets, reps, intensity }: ExerciseRowProps) {
  const [open, setOpen] = useState(false);
  const { fiveThreeOneInfo, completed } = useFiveThreeOneContext();
  const [exerciseSelected, setExerciseSelected] = useState<PersonalBest>();
  const [latestLogs, setLatestLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { fetch } = useFetch();

  const { bench, ohp, squat, deadlift } = fiveThreeOneInfo;
  const exercises = [bench, ohp, squat, deadlift];

  useEffect(() => {
    const fetchLatestLog = async () => {
      const response: LogEntry[] = await fetch("/api/logs/latest", {
        method: "POST",
        body: JSON.stringify({
          exerciseIds: exercises.map((e) => e?.exercise?.exerciseId),
        }),
      });
      setLatestLogs(response);
    };

    const fetchLogs = async () => {
      setLoading(true);
      const response: LogEntry[] = await fetch("/api/logs", {
        method: "POST",
        body: JSON.stringify({
          exerciseIds: exercises.map((e) => e?.exercise?.exerciseId),
        }),
      });
      setLogs(response);
      setLoading(false);
    };

    fetchLatestLog();
    fetchLogs();
  }, []);

  const handleOpen = (exercise: PersonalBest) => {
    setExerciseSelected(exercise);
    setOpen(true);
  };

  const exerciseLogs = logs.filter(
    (l) => l.exerciseId === exerciseSelected?.exercise.exerciseId
  );

  return (
    <div>
      {[bench, ohp, squat, deadlift].map((pb) => {
        const isCompleted = completed.includes(pb?.exercise?.exerciseId);
        return (
          <div key={pb?.exercise?.name}>
            <div className="flex mb-2 justify-between">
              <span className="truncate">{pb?.exercise?.name}</span>
              <div className="ml-4">
                {isCompleted ? (
                  <CheckCircleTwoTone
                    className="text-2xl"
                    twoToneColor="#52c41a"
                  />
                ) : (
                  <Button type="primary" onClick={() => handleOpen(pb)}>
                    Start
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
      {exerciseSelected && (
        <CompleteFiveThreeOneModal
          open={open}
          onClose={() => setOpen(false)}
          selectedExercise={exerciseSelected}
          sets={sets}
          reps={reps}
          logs={exerciseLogs}
          intensity={intensity}
          setLogs={setLogs}
          latestLog={latestLogs.find(
            (l) => l.exerciseId === exerciseSelected.exercise.exerciseId
          )}
        />
      )}
    </div>
  );
}
