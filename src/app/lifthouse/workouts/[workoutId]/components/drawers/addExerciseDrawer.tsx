import { PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { Button, Drawer, Input, Modal, Space } from "antd";
import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useWorkoutIdContext } from "../../context";
import ExerciseList from "./common/ExerciseList";

type Props = {
  drawOpen: boolean;
  setDrawOpen: (modalOpen: boolean) => void;
  onClickMuscle: (exerciseId: number) => void;
  filterOutExercisesIds?: number[];
};
export default function AddExerciseDrawer({
  drawOpen,
  setDrawOpen,
  onClickMuscle,
}: Props) {
  const { exercises, workout } = useWorkoutIdContext();
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExercises = exercises
    .filter(
      (e) => !workout.exercises.some((e2) => e2.exerciseId === e.exerciseId)
    )
    .filter((e) =>
      e.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <Drawer
      title={
        search ? (
          <Input
            onChange={(value) => setSearchQuery(value.currentTarget.value)}
            placeholder="Search exercises"
          />
        ) : (
          "Add exercises"
        )
      }
      open={drawOpen}
      extra={
        <Button
          className="ml-2"
          onClick={() => setSearch(!search)}
          type="dashed"
          icon={<SearchOutlined />}
        />
      }
      onClose={() => setDrawOpen(false)}
      width={500}
    >
      <ExerciseList
        exerciseList={filteredExercises}
        onClickMuscle={onClickMuscle}
      />
    </Drawer>
  );
}
