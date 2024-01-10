import { useEffect, useState } from "react";
import { useWorkout } from "../hooks/useWorkout";
import { Exercise, Workout } from "@/lib/supabase/db/types";
import { Collapse, CollapseProps, Space } from "antd";

type RecordProps = {
  workout: Workout;
  exercises: Exercise[];
};

export function Record({ workout, exercises }: RecordProps) {
  return <div className="pr-4 pb-4"></div>;
}
