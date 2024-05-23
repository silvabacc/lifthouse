import { Button, Collapse, CollapseProps, Modal, notification } from "antd";
import CompleteFiveThreeOneModal from "./components/complete531";
import { useEffect, useState } from "react";
import { useFiveThreeOneContext } from "./context";
import { LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleTwoTone } from "@ant-design/icons";
import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { useFiveThreeOne } from "./useFiveThreeOne";
import {
  NotificationDescription,
  NotificationMessage,
} from "./components/notification";

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

    fetchLatestLog();
  }, []);

  const handleOpen = (exercise: PersonalBest) => {
    setExerciseSelected(exercise);
    setOpen(true);
  };

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
          intensity={intensity}
          latestLog={latestLogs.find(
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
};
function WeekTitle({ week, currentWeek }: WeekTitleProps) {
  const { increasePersonalBests } = useFiveThreeOne();
  const { setWeek, setCompleted, fiveThreeOneInfo } = useFiveThreeOneContext();
  const { cacheFiveThreeOneInfo } = useLocalStorage();
  const [api, contextHolder] = notification.useNotification();
  const [modal, modalContextHolder] = Modal.useModal();

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
    const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;
    const exercises = [bench, squat, deadlift, ohp];

    if (week >= 4) {
      setWeek(1);
      cacheFiveThreeOneInfo({ week: 1, completed: [] });
      await increasePersonalBests();

      api.info({
        message: <NotificationMessage />,
        description: <NotificationDescription exercises={exercises} />,
      });
    } else {
      setWeek(week + 1);
      cacheFiveThreeOneInfo({ week: week + 1, completed: [] });
    }

    setCompleted([]);
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
