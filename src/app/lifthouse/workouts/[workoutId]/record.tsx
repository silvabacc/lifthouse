import { useEffect, useState } from "react";
import { useWorkout } from "../hooks/useWorkout";
import { Exercise, Workout } from "@/lib/supabase/db/types";
import { Collapse, CollapseProps, Input, Space } from "antd";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";

const { TextArea } = Input;

export function Record() {
  const { workout } = useWorkoutIdContext();
  const [workoutNote, setWorkoutNote] = useState("");

  return (
    <Space direction="vertical" className="w-full">
      {workout.exercises.map((exercise, index) => {
        return (
          <div key={`${exercise.exerciseId}-${index}`}>
            <div className="flex flex-wrap justify-between">
              <Space className="flex-wrap">
                <SelectExercise defaultExercise={exercise} />
                <SelectRepsScheme defaultExercise={exercise} />
              </Space>
            </div>
            <TextArea
              autoSize={true}
              placeholder="Notes"
              className="mt-4"
              onChange={(e) => setWorkoutNote(e.target.value)}
            />
          </div>
        );
      })}
    </Space>
  );
}
