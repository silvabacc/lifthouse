import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkout } from "../hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";
import AddButton from "./addButton";
import WorkoutFormDrawer from "./workoutDrawerForm";
import getConfig from "@/config";

const { pageUrl } = getConfig();

type FieldType = {
  name: string;
  description: string;
};

type AddWorkoutCardProps = {
  setWorkouts: Dispatch<SetStateAction<Workout[]>>;
};

export default function AddWorkoutCard({ setWorkouts }: AddWorkoutCardProps) {
  const [drawOpen, setDrawOpen] = useState(false);
  const [disable, setDisabled] = useState(false);
  const { createWorkoutPlan } = useWorkout();
  const router = useRouter();

  const onFinish = async (info: FieldType) => {
    setDisabled(true);
    const response = await createWorkoutPlan(info.name, info.description);
    router.push(`${pageUrl}/workouts/${response.workoutId}`);

    setWorkouts((prev) => [...prev, response]);
    setDrawOpen(false);
    setDisabled(false);
  };

  return (
    <>
      <AddButton title="+ Add Workout Plan" onClick={() => setDrawOpen(true)} />
      <WorkoutFormDrawer
        title="Add workout plan"
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        onFinish={onFinish}
      />
    </>
  );
}
