"use client";

import {
  Button,
  Collapse,
  CollapseProps,
  Divider,
  Modal,
  notification,
  Space,
} from "antd";
import CompleteFiveThreeOneModal from "./components/complete531";
import { useEffect, useState } from "react";
import { FiveThreeOne, LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleTwoTone } from "@ant-design/icons";
import {
  NotificationDescription,
  NotificationMessage,
} from "./components/notification";
import { goNextWeek, increasePersonalBests } from "./actions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type FiveThreeOneWeeksProps = {
  info: FiveThreeOne;
};
export default function FiveThreeOneWeeks({ info }: FiveThreeOneWeeksProps) {
  const { current_week: week } = info;
  const items: CollapseProps["items"] = [
    {
      title: <WeekTitle week={1} currentWeek={week} info={info} />,
      sets: 3,
      reps: [5, 5, 5],
      intensity: [0.65, 0.75, 0.85],
    },
    {
      title: <WeekTitle week={2} currentWeek={week} info={info} />,
      sets: 3,
      reps: [3, 3, 3],
      intensity: [0.7, 0.8, 0.9],
    },
    {
      title: <WeekTitle week={3} currentWeek={week} info={info} />,
      sets: 3,
      reps: [5, 3, 1],
      intensity: [0.75, 0.85, 0.95],
    },
    {
      title: <WeekTitle week={4} currentWeek={week} info={info} />,
      sets: 3,
      reps: [5, 5, 5],
      intensity: [0.4, 0.5, 0.6],
    },
  ].map((item, index) => ({
    key: index + 1,
    label: <h3 className="font-bold m-0">{item.title}</h3>,
    showArrow: false,
    children: (
      <ExerciseRow
        info={info}
        sets={item.sets}
        reps={item.reps}
        intensity={item.intensity}
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
      <div className="hidden lg:grid lg:grid-cols-4 gap-12 mt-2">
        {items.map((item) => (
          <Space
            direction="vertical"
            key={item.key}
            className={`
              ${
                item.collapsible === "disabled"
                  ? "bg-grey-500 opacity-25 pointer-events-none"
                  : ""
              } bg-white rounded-lg p-6`}
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
  info: FiveThreeOne;
  sets: number;
  reps: number[];
  intensity: number[];
};
function ExerciseRow({ sets, reps, intensity, info }: ExerciseRowProps) {
  const { bench, ohp, squat, deadlift, completed } = info;
  const exercises = [bench, ohp, squat, deadlift];

  const [open, setOpen] = useState(false);
  const [exerciseSelected, setExerciseSelected] = useState<PersonalBest>();
  const { data: latestLogs } = useQuery({
    queryKey: ["latestLogs"],
    queryFn: () => fetchLatestLog(exercises),
  });

  const handleOpen = (exercise: PersonalBest) => {
    setExerciseSelected(exercise);
    setOpen(true);
  };

  return (
    <div className="w-full">
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
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
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
          intensity={intensity}
          latestLog={latestLogs?.find(
            (l) => l.exerciseId === exerciseSelected.exercise.exerciseId
          )}
        />
      )}
    </div>
  );
}

type WeekTitleProps = {
  week: number;
  currentWeek: number;
  info: FiveThreeOne;
};
function WeekTitle({ week, currentWeek, info }: WeekTitleProps) {
  const [api, contextHolder] = notification.useNotification();
  const [modal, modalContextHolder] = Modal.useModal();
  const router = useRouter();

  const showWeek = week === currentWeek;
  const onClickSkip = async () => {
    modal.confirm({
      title: "Are you sure you want to skip this week?",
      onOk: async () => {
        await skipWeek();
      },
      okText: "Yes",
      cancelText: "No",
    });
  };

  const skipWeek = async () => {
    const { bench, squat, deadlift, ohp } = info;
    const exercises = [bench, squat, deadlift, ohp];

    if (week >= 4) {
      await increasePersonalBests();

      api.info({
        message: <NotificationMessage />,
        description: <NotificationDescription exercises={exercises} />,
      });
    } else {
      goNextWeek(week);
    }

    router.refresh();
  };

  return (
    <div className="flex justify-between font-bold m-0">
      {contextHolder}
      {modalContextHolder}
      <span>Week {week}</span>
      {showWeek && (
        <Button onClick={onClickSkip} type="link">
          Skip
        </Button>
      )}
    </div>
  );
}

const fetchLatestLog = async (exercises: PersonalBest[]) => {
  const url = `/api/logs/latest?exercise_ids=${exercises
    .map((exercise) => exercise.exercise.exerciseId)
    .join(",")}`;
  const response = await axios.get<LogEntry[]>(url);
  return response.data;
};
