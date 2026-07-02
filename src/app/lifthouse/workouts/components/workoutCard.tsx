"use client";

import { App, Button, Divider, Typography } from "antd";
import { useState, useTransition } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import WorkoutFormDrawer, {
  ExerciseFormDrawerField,
} from "./workoutDrawerForm";
import { Workout } from "@/lib/supabase/db/types";
import Link from "next/link";
import { updateWorkoutMeta } from "../actions";

const { Paragraph } = Typography;

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
  onDelete: (id: number) => void;
  onWorkoutUpdate: () => void;
};

export default function WorkoutCard({
  name,
  description,
  workoutId,
  onDelete,
  onWorkoutUpdate,
}: WorkoutCardProps) {
  const [drawOpen, setDrawOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { modal } = App.useApp();

  const showDeleteConfirm = () => {
    modal.confirm({
      title: "Are you sure delete this workout plan?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      centered: true,
      cancelText: "No",
      onOk() {
        onDelete(workoutId);
      },
    });
  };

  const onFinish = (info: ExerciseFormDrawerField) => {
    startTransition(async () => {
      await updateWorkoutMeta(workoutId, info.name, info.description);
      onWorkoutUpdate();
      setDrawOpen(false);
    });
  };

  return (
    <BottomFadeInAnimation className="flex flex-col justify-between bg-white cursor-pointer">
      <WorkoutFormDrawer
        title="Edit workout plan"
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        onFinish={onFinish}
        options={{ nameRequired: false, descriptionRequired: false }}
        defaultTitleFieldValue={name}
        defaultDescriptionFieldValue={description}
      />
      <Link href={`/lifthouse/workouts/${workoutId}?name=${name}`}>
        <div className="relative p-6">
          <h1 className="text-black text-base font-medium pb-2">{name}</h1>
          <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>
            {description}
          </Paragraph>
        </div>
      </Link>
      <div className="flex items-center justify-between py-2 bg-gray-50">
        <Button
          className="flex-1 text-gray-400"
          type="link"
          loading={isPending}
          onClick={() => setDrawOpen(true)}
        >
          Edit
        </Button>
        <Divider orientation="vertical" />
        <Button
          onClick={showDeleteConfirm}
          className="flex-1 text-gray-400"
          type="link"
        >
          Delete
        </Button>
      </div>
    </BottomFadeInAnimation>
  );
}
