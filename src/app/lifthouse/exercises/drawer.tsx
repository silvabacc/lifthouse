import { Exercise } from "@/lib/supabase/db/types";
import { Button, Drawer } from "antd";
import { LogVisual } from "../components/logVisuals/logVisual";

type Props = {
  exercise?: Exercise;
  show: boolean;
  onClose: () => void;
};
export default function ExerciseDrawer({ exercise, show, onClose }: Props) {
  return (
    <Drawer width={"100%"} open={show} onClose={onClose} closable>
      {exercise && (
        <LogVisual showExerciseName allowNewEntry exercise={exercise} />
      )}
    </Drawer>
  );
}
