"use client";

import { App, Button, Typography } from "antd";
import { useState, useTransition } from "react";
import {
  ExclamationCircleFilled,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { BottomFadeInAnimation } from "@/app/animations/bottomFadeInAnimation";
import WorkoutFormDrawer, {
  ExerciseFormDrawerField,
} from "./workoutDrawerForm";
import { ExerciseConfiguration, WorkoutTemplate } from "@/lib/supabase/db/types";
import Link from "next/link";
import { updateWorkoutMeta } from "../actions";

const { Paragraph } = Typography;

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
  exercises?: ExerciseConfiguration[];
  template?: WorkoutTemplate;
  onDelete: (id: number) => void;
  onWorkoutUpdate: () => void;
};

function templateLabel(template?: WorkoutTemplate) {
  if (!template || template === WorkoutTemplate.custom) return undefined;
  return template
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" · ");
}

export default function WorkoutCard({
  name,
  description,
  workoutId,
  exercises,
  template,
  onDelete,
  onWorkoutUpdate,
}: WorkoutCardProps) {
  const [drawOpen, setDrawOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { modal } = App.useApp();

  const showDeleteConfirm = () => {
    modal.confirm({
      title: "Delete this workout plan?",
      content: "This can't be undone.",
      icon: <ExclamationCircleFilled />,
      okText: "Delete",
      okType: "danger",
      centered: true,
      cancelText: "Cancel",
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

  const badge = templateLabel(template);
  const exerciseCount = exercises?.length ?? 0;

  return (
    <BottomFadeInAnimation className="flex h-full flex-col justify-between overflow-hidden rounded-xl border border-solid border-gray-100 bg-white transition-all hover:border-indigo-200 hover:shadow-md">
      <WorkoutFormDrawer
        title="Edit workout plan"
        open={drawOpen}
        onClose={() => setDrawOpen(false)}
        onFinish={onFinish}
        options={{ nameRequired: false, descriptionRequired: false }}
        defaultTitleFieldValue={name}
        defaultDescriptionFieldValue={description}
      />
      <Link
        href={`/lifthouse/workouts/${workoutId}?name=${name}`}
        className="block flex-1"
      >
        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2 pb-1">
            <h2 className="m-0 text-base font-semibold text-gray-900">
              {name}
            </h2>
            {badge && (
              <span className="inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
                {badge}
              </span>
            )}
          </div>
          <Paragraph className="!mb-2 text-gray-500" ellipsis={{ rows: 2 }}>
            {description}
          </Paragraph>
          <p className="m-0 text-xs text-gray-400">
            {exerciseCount} exercise{exerciseCount === 1 ? "" : "s"}
          </p>
        </div>
      </Link>
      <div className="flex items-center justify-end gap-1 border-0 border-t border-solid border-gray-100 bg-gray-50/60 px-3 py-1.5">
        <Button
          type="text"
          size="small"
          icon={<EditOutlined />}
          loading={isPending}
          className="text-gray-500"
          onClick={() => setDrawOpen(true)}
        >
          Edit
        </Button>
        <Button
          type="text"
          size="small"
          danger
          icon={<DeleteOutlined />}
          onClick={showDeleteConfirm}
        >
          Delete
        </Button>
      </div>
    </BottomFadeInAnimation>
  );
}
