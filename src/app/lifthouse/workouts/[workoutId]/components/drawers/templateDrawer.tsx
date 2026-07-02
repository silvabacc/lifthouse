"use client";

import { Alert, App, Divider, Drawer, Radio, Space, Tooltip } from "antd";
import { useTransition } from "react";
import { useWorkoutIdContext } from "../../context";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { templateName } from "../../utils";
import TemplateInfo from "../templateInfo";
import { applyWorkoutTemplate } from "../../../actions";

type TemplateDrawerProps = {
  template: string;
  show: boolean;
  onCancel: () => void;
};

export default function TemplateDrawer({ template, show, onCancel }: TemplateDrawerProps) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const { modal } = App.useApp();
  const [, startTransition] = useTransition();

  const onClickWorkoutType = (value: WorkoutTemplate) => {
    modal.confirm({
      title: "Are you sure?",
      content: "This may overwrite your current workout plan",
      cancelText: "No",
      onOk: () => {
        startTransition(async () => {
          const updated = await applyWorkoutTemplate(workout.workoutId, value);
          setWorkout(updated);
          onCancel();
        });
      },
    });
  };

  return (
    <Drawer title="Workout Templates" open={show} onClose={onCancel}>
      <Space orientation="vertical">
        <Alert title="You can apply workout templates by clicking on the template buttons below. This will overwrite all of the exercises for this current workout plan, or you can stick with your custom workout plan" />
        <Radio.Group
          value={workout.template}
          buttonStyle="solid"
          onChange={(e) => onClickWorkoutType(e.target.value as WorkoutTemplate)}
        >
          <Space orientation="vertical">
            {Object.values(WorkoutTemplate).map((t) => (
              <Radio key={t} value={t}>
                {templateName[t] || t}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Space>
      <Divider />
      <TemplateInfo />
    </Drawer>
  );
}
