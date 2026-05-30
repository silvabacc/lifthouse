import { App, Button, Divider, Typography } from "antd";
import { useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import WorkoutFormDrawer, {
  ExerciseFormDrawerField,
} from "./workoutDrawerForm";
import { useWorkout } from "../hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";
import getConfig from "@/config";
import Link from "next/link";

const { pageUrl } = getConfig();
const { Paragraph } = Typography;

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
  onDelete: (id: number) => void;
  onWorkoutUpdate: (workout: Workout) => void;
};
export default function WorkoutCard({
  name,
  description,
  workoutId,
  onDelete,
  onWorkoutUpdate,
}: WorkoutCardProps) {
  const [drawOpen, setDrawOpen] = useState<boolean>(false);
  const { updateWorkoutPlan } = useWorkout();
  const { modal } = App.useApp();

  const showDeleteConfirm = () => {
    modal.confirm({
      title: "Are you sure delete this workout plan?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      centered: true,
      cancelText: "No",
      async onOk() {
        onDelete(workoutId);
      },
    });
  };

  const onFinish = async (info: ExerciseFormDrawerField) => {
    const log = await updateWorkoutPlan({
      workoutId,
      name: info.name,
      description: info.description,
    });

    if (log) {
      onWorkoutUpdate(log);
    }
    setDrawOpen(false);
  };

  return (
    <BottomFadeInAnimation className="flex flex-col justify-between bg-white cursor-pointer">
      <WorkoutFormDrawer
        title="Edit workout plan"
        open={drawOpen}
        onClose={() => setDrawOpen(!drawOpen)}
        onFinish={onFinish}
        options={{ nameRequired: false, descriptionRequired: false }}
        defaultTitleFieldValue={name}
        defaultDescriptionFieldValue={description}
      />
      <Link href={`${pageUrl}/workouts/${workoutId}?name=${name}`}>
        <div className="relative p-6 ">
          <h1 className="text-black text-base font-medium pb-2">{name}</h1>
          <Description text={description} />
        </div>
      </Link>
      <div className="flex items-center justify-between py-2 bg-gray-50">
        <Button
          className="flex-1 text-gray-400"
          type="link"
          onClick={() => setDrawOpen(true)}
        >
          Edit
        </Button>
        <Divider type="vertical" />
        <Button
          onClick={() => showDeleteConfirm()}
          className="flex-1 text-gray-400"
          type="link"
        >
          Delete
        </Button>
      </div>
    </BottomFadeInAnimation>
  );
}

type DescriptionProps = {
  text: string;
};
function Description({ text }: DescriptionProps) {
  return (
    <div>
      <Paragraph
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
        }}
      >
        {text}
      </Paragraph>
    </div>
  );
}
