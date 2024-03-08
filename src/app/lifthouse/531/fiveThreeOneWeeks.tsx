import { Exercise } from "@/lib/supabase/db/types";
import { Button, Checkbox, Collapse, CollapseProps, Space } from "antd";

type Props = {
  exercises: Exercise[];
  currentWeek: number;
};
export default function FiveThreeOneWeeks({ exercises, currentWeek }: Props) {
  const items: CollapseProps["items"] = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
  ].map((exercise, index) => ({
    key: index + 1,
    label: <h3 className="font-bold m-0">Week {index + 1}</h3>,
    children: <ExerciseRow exercises={exercises} />,
    collapsible: index + 1 !== currentWeek ? "disabled" : undefined,
  }));
  return <Collapse className="mt-4" items={items} />;
}
type ExerciseRowProps = {
  exercises: Exercise[];
};
function ExerciseRow({ exercises }: ExerciseRowProps) {
  return (
    <div>
      {exercises.map((exercise) => (
        <div className="flex mb-2 justify-between" key={exercise.exerciseId}>
          <Space>
            <span>{exercise.name}</span>
          </Space>
          <Button type="primary">Start</Button>
        </div>
      ))}
    </div>
  );
}
