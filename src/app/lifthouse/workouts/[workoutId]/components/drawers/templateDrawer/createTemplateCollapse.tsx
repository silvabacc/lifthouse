import AddButton from "@/app/lifthouse/workouts/components/addButton";
import { Button, Collapse, CollapseProps, Input, Space } from "antd";
import { useState, useTransition } from "react";
import ReorderComponent from "../common/ReorderComponent";
import ReorderItem from "../common/ReorderItem";
import { ExerciseConfiguration } from "@/lib/supabase/db/types";
import { SelectExercise } from "../../selectors";
import { useWorkoutIdContext } from "../../../context";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";

export default function CreateTemplateCollapse() {
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Create a new template",
      children: <CreateNewTemplate />,
    },
  ];

  return <Collapse items={items} />;
}

function CreateNewTemplate() {
  const [draggable, setDraggable] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState<string>();

  const [newExercises, setExercises] = useState<ExerciseConfiguration[]>([]);

  const addExercise = () => {
    setExercises((prev) => [
      ...prev,
      {
        exerciseId: newExercises.length + 1,
        reps: "",
        sets: 0,
      },
    ]);
  };

  const onChangeExercise = async (exerciseId: number, value: number) => {
    const updatedExercises = newExercises.map((e) => {
      if (e.exerciseId === exerciseId) {
        return {
          ...e,
          exerciseId: value,
        };
      }
      return e;
    });

    setExercises(updatedExercises);
  };

  const onClick = () => {
    startTransition(async () => {
      const fetchTemplate;
    });
  };

  return (
    <Space className="w-full" direction="vertical">
      <Input
        size="large"
        placeholder="Template name"
        onChange={(v) => setTitle(v.target.value)}
      />
      <ReorderComponent values={newExercises} onReorder={setExercises}>
        {newExercises.map((item, idx) => (
          <ReorderItem
            key={item?.exerciseId.toString()}
            item={item}
            draggable={draggable}
            onDragEnd={(v) => setDraggable(v)}
          >
            <SelectExercise
              items={newExercises}
              defaultExercise={item}
              onChange={onChangeExercise}
            />
            <Button danger type="link">
              Remove
            </Button>
          </ReorderItem>
        ))}
      </ReorderComponent>
      <AddButton title="Add exercise" onClick={addExercise} />
      <Button
        className="w-full"
        icon={<SaveOutlined />}
        type={isPending ? "default" : "primary"}
        onClick={onClick}
      >
        {isPending ? "Saving 🚀" : "Save"}
      </Button>
    </Space>
  );
}

const DeleteButton = () => {
  return <Button icon={<DeleteOutlined />} />;
};
