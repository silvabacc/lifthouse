import { Drawer, Space } from "antd";
import { Reorder, useDragControls } from "framer-motion";
import { useWorkoutIdContext } from "../../context";
import { useEffect, useState } from "react";
import { SelectExercise, SelectRepsScheme } from "../selectors";
import { MenuOutlined } from "@ant-design/icons";

type Props = {
  show: boolean;
  onCancel: () => void;
};
export default function EditWorkoutDrawer({ show, onCancel }: Props) {
  const { workout } = useWorkoutIdContext();
  const [workoutExercises, setWorkoutExercises] = useState(
    workout.exercises || []
  );
  const controls = useDragControls();

  useEffect(() => {
    setWorkoutExercises(workout.exercises || []);
  }, [workout]);

  const onClose = async () => {
    onCancel();
  };

  return (
    <Drawer width={"100%"} open={show} onClose={onClose}>
      <Reorder.Group
        className="h-full"
        axis="y"
        values={workoutExercises}
        onReorder={setWorkoutExercises}
      >
        <Space size="large" className="w-full" direction="vertical">
          {workoutExercises.map((item) => (
            <Reorder.Item
              className="p-2 shadow rounded flex justify-between items-center w-full bg-white"
              key={item?.exerciseId}
              value={item}
              dragControls={controls}
            >
              <Space direction="vertical" className="w-full">
                <SelectExercise defaultExercise={item} />
                <SelectRepsScheme defaultExercise={item} />
              </Space>
              <MenuOutlined
                className="m-4"
                onPointerDown={(e) => controls.start(e)}
              />
            </Reorder.Item>
          ))}
        </Space>
      </Reorder.Group>
    </Drawer>
  );
}
