"use client";

import { Exercise } from "@/lib/supabase/db/types";
import { Drawer } from "antd";
import { LogVisual } from "../components/logVisuals/logVisual";
import ChartsSkeleton from "../components/logVisuals/charts.skeleton";
import { useDeferredDrawerContent } from "@/hooks/useDeferredDrawerContent";

type Props = {
  exercise?: Exercise;
  show: boolean;
  onClose: () => void;
};

export default function ExerciseDrawer({ exercise, show, onClose }: Props) {
  const { contentReady, afterOpenChange } = useDeferredDrawerContent(show);

  return (
    <Drawer
      width="min(720px, 100vw)"
      open={show}
      onClose={onClose}
      afterOpenChange={afterOpenChange}
      closable
      title={
        exercise && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-base font-semibold">{exercise.name}</span>
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
              {exercise.primaryMuscleGroup}
            </span>
          </div>
        )
      }
    >
      {exercise &&
        (contentReady ? (
          <LogVisual allowNewEntry exercise={exercise} />
        ) : (
          <ChartsSkeleton />
        ))}
    </Drawer>
  );
}
