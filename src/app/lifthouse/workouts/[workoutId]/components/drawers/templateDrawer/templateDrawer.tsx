import { Alert, Divider, Drawer, Modal, Radio, Space, Tooltip } from "antd";
import { useWorkout } from "../../../../hooks/useWorkout";
import { useWorkoutIdContext } from "../../../context";
import { WorkoutTemplate } from "@/lib/supabase/db/types";
import { templateName } from "../../../utils";
import TemplateInfo from "../../templateInfo";
import CreateTemplateCollapse from "./createTemplateCollapse";

type TemplateDrawerProps = {
  show: boolean;
  onCancel: () => void;
};
export default function TemplateDrawer({
  show,
  onCancel,
}: TemplateDrawerProps) {
  const { workout, setWorkout } = useWorkoutIdContext();
  const { updateTemplate } = useWorkout();

  const onClickWorkoutType = (value: WorkoutTemplate) => {
    Modal.confirm({
      title: "Are you sure?",
      content: "This may overwrite your current workout plan",
      cancelText: "No",
      onOk: async () => {
        const updatedData = await updateTemplate(workout.workoutId, value);
        setWorkout(updatedData);
        onCancel();
      },
    });
  };
  return (
    <Drawer title={"Workout Templates"} open={show} onClose={onCancel}>
      <Space direction="vertical">
        <Alert
          message="You can apply workout templates by clicking on the template buttons
          below. This will overwrite all of the exercises for this current
          workout plan, or you can stick with your custom workout plan"
        ></Alert>
        <Radio.Group
          value={workout.template}
          buttonStyle="solid"
          onChange={(value) =>
            onClickWorkoutType(value.target.value as WorkoutTemplate)
          }
        >
          <Space direction="vertical">
            {/* Can add more templates */}
            {Object.values(WorkoutTemplate).map((template) => {
              return (
                <Radio key={template} value={template}>
                  {templateName[template] || template}
                </Radio>
              );
            })}
          </Space>
        </Radio.Group>
        <CreateTemplateCollapse />
      </Space>
      <Divider />
      <TemplateInfo />
    </Drawer>
  );
}
