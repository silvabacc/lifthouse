import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { Button, Drawer, Input, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useWorkout } from "../../useWorkout";

type Props = {
  drawOpen: boolean;
  setDrawOpen: (modalOpen: boolean) => void;
  onClickMuscle: (exercise: Exercise) => void;
};
export default function AddExerciseDrawer({
  drawOpen,
  setDrawOpen,
  onClickMuscle,
}: Props) {
  const { fetch } = useFetch();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesResponse: Exercise[] = await fetch("/api/exercises");
      setExercises(exercisesResponse);
    };

    fetchExercises();
  }, []);

  const filteredExercises = exercises.filter((e) =>
    e.name.toLocaleLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPrimaryMuscleGroups = Object.values(PrimaryMuscleGroup).filter(
    (muscle) => filteredExercises.some((e) => e.primaryMuscleGroup === muscle)
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
      {filteredPrimaryMuscleGroups.length === 0 && (
        <span className="text-lg">No exercises with that name is found 😢</span>
      )}
      {filteredPrimaryMuscleGroups.map((muscle) => {
        return (
          <div key={muscle}>
            <p className="text-xs text-gray-500 py-2">{muscle}</p>
            <Space direction="vertical">
              {filteredExercises
                .filter((e) => e.primaryMuscleGroup === muscle)
                .map((e) => (
                  <div
                    key={e.exerciseId}
                    onClick={() => onClickMuscle(e)}
                    className="font-medium cursor-pointer hover:text-gray-500"
                  >
                    {e.name}
                  </div>
                ))}
            </Space>
          </div>
        );
      })}
    </Drawer>
  );
}
