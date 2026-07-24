"use client";

import { App, Button, Collapse, CollapseProps, Divider, Space } from "antd";
import CompleteFiveThreeOneModal from "./components/complete531";
import { useState } from "react";
import { useFiveThreeOneContext } from "./context";
import { LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useFiveThreeOne } from "./useFiveThreeOne";
import {
  NotificationDescription,
  NotificationMessage,
} from "./components/notification";
import { getWeekSpecificLog } from "../actions";

export default function FiveThreeOneWeeks() {
  const { week } = useFiveThreeOneContext();

  const items: CollapseProps["items"] = [
    {
      title: <WeekTitle week={1} currentWeek={week} />,
      sets: 3,
      reps: [5, 5, 5],
      intensity: [0.65, 0.75, 0.85],
    },
    {
      title: <WeekTitle week={2} currentWeek={week} />,
      sets: 3,
      reps: [3, 3, 3],
      intensity: [0.7, 0.8, 0.9],
    },
    {
      title: <WeekTitle week={3} currentWeek={week} />,
      sets: 3,
      reps: [5, 3, 1],
      intensity: [0.75, 0.85, 0.95],
    },
    {
      title: <WeekTitle week={4} currentWeek={week} />,
      sets: 3,
      reps: [5, 5, 5],
      intensity: [0.4, 0.5, 0.6],
    },
  ].map((item, index) => ({
    key: index + 1,
    label: (
      <div>
        <h3 className="font-bold m-0">{item.title}</h3>
        <p className="m-0 text-xs font-normal text-gray-400">
          {item.reps.join(" / ")} reps ·{" "}
          {item.intensity.map((i) => `${i * 100}%`).join(" / ")}
        </p>
      </div>
    ),
    showArrow: false,
    children: (
      <ExerciseRow
        sets={item.sets}
        reps={item.reps}
        intensity={item.intensity}
        isActiveWeek={index + 1 === week}
      />
    ),
    collapsible: index + 1 !== week ? "disabled" : undefined,
  }));

  return (
    <div>
      <Collapse
        activeKey={week}
        className="mt-4 w-full lg:hidden"
        items={items}
      />
      <div className="hidden lg:grid lg:grid-cols-4 gap-12 mt-6">
        {items.map((item) => (
          <Space
            orientation="vertical"
            key={item.key}
            className={`${
              item.collapsible === "disabled"
                ? "opacity-40 pointer-events-none border-gray-100"
                : "border-indigo-200 shadow-sm"
            } bg-white rounded-xl border border-solid p-6`}
          >
            <div>{item.label}</div>
            <Divider className="mt-1" />
            <div>{item.children}</div>
          </Space>
        ))}
      </div>
    </div>
  );
}

type ExerciseRowProps = {
  sets: number;
  reps: number[];
  intensity: number[];
  isActiveWeek: boolean;
};

function ExerciseRow({ sets, reps, intensity, isActiveWeek }: ExerciseRowProps) {
  const [open, setOpen] = useState(false);
  const { fiveThreeOneInfo, completed } = useFiveThreeOneContext();
  const [exerciseSelected, setExerciseSelected] = useState<PersonalBest>();
  const [latestLog, setLatestLog] = useState<LogEntry | undefined>();

  const { bench, ohp, squat, deadlift } = fiveThreeOneInfo;
  const exercises = [bench, ohp, squat, deadlift];

  const handleOpen = async (exercise: PersonalBest) => {
    setExerciseSelected(exercise);
    setOpen(true);
    // The last set weight uniquely identifies which 531 week a log belongs to.
    // e.g. Week 1 last set = intensity[2] (0.85) × 0.9 × pb
    const lastIntensity = intensity[intensity.length - 1];
    const expectedWeight = parseFloat(
      (lastIntensity * 0.9 * exercise.pb).toFixed(0),
    );
    const log = await getWeekSpecificLog(
      exercise.exercise.exerciseId,
      expectedWeight,
    );
    setLatestLog(log);
  };

  return (
    <div className="w-full">
      {exercises.map((pb) => {
        const isCompleted =
          isActiveWeek && completed.includes(pb?.exercise?.exerciseId);
        return (
          <div
            key={pb?.exercise?.name}
            className="mb-2 flex items-center justify-between rounded-lg px-2 py-1.5 hover:bg-gray-50"
          >
            <span className="truncate text-sm font-medium text-gray-800">
              {pb?.exercise?.name}
            </span>
            <div className="ml-4">
              {isCompleted ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-600">
                  <CheckCircleTwoTone twoToneColor="#16a34a" /> Done
                </span>
              ) : (
                <Button size="small" type="primary" onClick={() => handleOpen(pb)}>
                  Start
                </Button>
              )}
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
          intensity={intensity}
          latestLog={latestLog}
        />
      )}
    </div>
  );
}

type WeekTitleProps = {
  week: number;
  currentWeek: number;
};

function WeekTitle({ week, currentWeek }: WeekTitleProps) {
  const { increasePersonalBests } = useFiveThreeOne();
  const { setWeek, setCompleted, fiveThreeOneInfo } = useFiveThreeOneContext();
  const { cacheFiveThreeOneInfo } = useLocalStorage();
  const { notification: api, modal } = App.useApp();

  const showWeek = week === currentWeek;

  const onClickSkip = () => {
    modal.confirm({
      title: "Are you sure you want to skip this week?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        if (week >= 4) {
          setWeek(1);
          cacheFiveThreeOneInfo({ week: 1, completed: [] });
          await increasePersonalBests();
          const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;
          api.info({
            title: <NotificationMessage />,
            description: (
              <NotificationDescription
                exercises={[bench, squat, deadlift, ohp]}
              />
            ),
          });
        } else {
          setWeek(week + 1);
          cacheFiveThreeOneInfo({ week: week + 1, completed: [] });
        }
        setCompleted([]);
      },
    });
  };

  return (
    <div className="flex justify-between font-bold m-0">
      <span>Week {week}</span>
      {showWeek && (
        <Button onClick={onClickSkip} size="small" type="link">
          Skip week
        </Button>
      )}
    </div>
  );
}
