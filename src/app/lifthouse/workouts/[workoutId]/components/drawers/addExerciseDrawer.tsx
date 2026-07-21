import { PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { Drawer, Input, Skeleton } from "antd";
import { useDeferredValue, useMemo, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useWorkoutIdContext } from "../../context";
import { useDeferredDrawerContent } from "@/hooks/useDeferredDrawerContent";

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
  filterOutExercisesIds = [],
}: Props) {
  const { exercises } = useWorkoutIdContext();
  const [searchQuery, setSearchQuery] = useState("");
  const { contentReady, afterOpenChange } = useDeferredDrawerContent(drawOpen);

  // Deferred so keystrokes stay responsive while the list filters
  const deferredQuery = useDeferredValue(searchQuery);
  const filteredExercises = useMemo(
    () =>
      exercises.filter((e) =>
        e.name.toLocaleLowerCase().includes(deferredQuery.toLowerCase())
      ),
    [exercises, deferredQuery]
  );

  const filteredPrimaryMuscleGroups = Object.values(PrimaryMuscleGroup).filter(
    (muscle) => filteredExercises.some((e) => e.primaryMuscleGroup === muscle)
  );

  return (
    <Drawer
      title="Add exercise"
      open={drawOpen}
      onClose={() => setDrawOpen(false)}
      afterOpenChange={afterOpenChange}
      width="min(480px, 100vw)"
    >
      <Input
        allowClear
        size="large"
        prefix={<SearchOutlined className="text-gray-400" />}
        onChange={(value) => setSearchQuery(value.currentTarget.value)}
        placeholder="Search exercises"
        className="mb-4"
      />
      {!contentReady && <Skeleton active paragraph={{ rows: 6 }} />}
      {contentReady && filteredPrimaryMuscleGroups.length === 0 && (
        <p className="text-base text-gray-500">
          No exercises match &ldquo;{searchQuery}&rdquo; 😢
        </p>
      )}
      {contentReady && filteredPrimaryMuscleGroups.map((muscle) => {
        const group = filteredExercises
          .filter((e) => e.primaryMuscleGroup === muscle)
          .filter((e) => !filterOutExercisesIds.includes(e.exerciseId));

        if (group.length === 0) return null;

        return (
          <div key={muscle} className="mb-4">
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              {muscle}
            </p>
            <div className="flex flex-col">
              {group.map((e) => (
                <button
                  key={e.exerciseId}
                  type="button"
                  onClick={() => onClickMuscle(e.exerciseId)}
                  className="group flex w-full cursor-pointer items-center justify-between rounded-lg border-0 bg-transparent px-3 py-3 text-left text-base font-medium text-gray-800 transition-colors hover:bg-indigo-50/60"
                >
                  {e.name}
                  <PlusOutlined className="text-gray-300 transition-colors group-hover:text-indigo-500" />
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </Drawer>
  );
}
