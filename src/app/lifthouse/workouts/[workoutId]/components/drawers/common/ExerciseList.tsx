import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { Space } from "antd";

type Props = {
  onClickMuscle: (exerciseId: number) => void;
  exerciseList?: Exercise[];
};
export default function ExerciseList({ exerciseList, onClickMuscle }: Props) {
  const filteredPrimaryMuscleGroups = Object.values(PrimaryMuscleGroup).filter(
    (muscle) => exerciseList?.some((e) => e.primaryMuscleGroup === muscle)
  );

  if (!exerciseList || exerciseList.length === 0) {
    return (
      <span className="text-lg">No exercises with that name is found 😢</span>
    );
  }

  return (
    <div>
      {filteredPrimaryMuscleGroups.map((muscle) => {
        return (
          <div key={muscle}>
            <p className="text-xs text-gray-500">{muscle}</p>
            <Space direction="vertical">
              {exerciseList
                .filter((e) => e.primaryMuscleGroup === muscle)
                .map((e) => (
                  <div
                    key={e.exerciseId}
                    onClick={() => onClickMuscle(e.exerciseId)}
                    className="font-medium cursor-pointer hover:text-gray-500"
                  >
                    {e.name}
                  </div>
                ))}
            </Space>
          </div>
        );
      })}
    </div>
  );
}
