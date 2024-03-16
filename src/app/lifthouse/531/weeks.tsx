import { Button, Collapse, CollapseProps, Space } from "antd";
import CompleteFiveThreeOneModal from "./components/complete531";
import { useEffect, useState } from "react";
import { useFiveThreeOneContext } from "./context";
import { PersonalBest } from "@/lib/supabase/db/types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

export default function FiveThreeOneWeeks() {
  const { getCachedFiveThreeOneInfo } = useLocalStorage();
  const cacheFiveThreeOneInfo = getCachedFiveThreeOneInfo();

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
  ].map((week, index) => ({
    key: index + 1,
    label: <h3 className="font-bold m-0">{week.title}</h3>,
    children: (
      <ExerciseRow
        sets={week.sets}
        reps={week.reps}
        intensity={week.intensity}
      />
    ),
    collapsible:
      index + 1 !== (cacheFiveThreeOneInfo?.week || 1) ? "disabled" : undefined,
  }));
  return <Collapse className="mt-4" items={items} />;
}

type ExerciseRowProps = {
  sets: number;
  reps: number[];
  intensity: number[];
};
function ExerciseRow({ sets, reps, intensity }: ExerciseRowProps) {
  const [open, setOpen] = useState(false);
  const { fiveThreeOneInfo } = useFiveThreeOneContext();
  const [exerciseSelected, setExerciseSelected] = useState<PersonalBest>();

  const { bench, ohp, squat, deadlift } = fiveThreeOneInfo;

  const handleOpen = (exercise: PersonalBest) => {
    setExerciseSelected(exercise);
    setOpen(true);
  };

  return (
    <div>
      {[bench, ohp, squat, deadlift].map((pb) => (
        <div key={pb?.exercise?.name}>
          <div className="flex mb-2 justify-between">
            <Space>
              <span>{pb?.exercise?.name}</span>
            </Space>
            <Button type="primary" onClick={() => handleOpen(pb)}>
              Start
            </Button>
          </div>
        </div>
      ))}
      {exerciseSelected && (
        <CompleteFiveThreeOneModal
          open={open}
          onClose={() => setOpen(false)}
          selectedExercise={exerciseSelected}
          sets={sets}
          reps={reps}
          intensity={intensity}
        />
      )}
    </div>
  );
}
