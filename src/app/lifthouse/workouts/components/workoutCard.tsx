import { Button, Divider, Modal, Drawer, Form, Input, Space } from "antd";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import ExerciseFormDrawer, {
  ExerciseFormDrawerField,
} from "./exerciseFormDrawer";
import { useWorkout } from "../hooks/useWorkout";
import { Workout } from "@/lib/supabase/db/types";

const { confirm } = Modal;
const { TextArea } = Input;

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
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const router = useRouter();

  const showDeleteConfirm = () => {
    confirm({
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

  const onCardClick = () => {
    router.push(`/lifthouse/workouts/${workoutId}?name=${name}`);
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
      <ExerciseFormDrawer
        open={drawOpen}
        onClose={() => setDrawOpen(!drawOpen)}
        onFinish={onFinish}
        options={{ nameRequired: false, descriptionRequired: false }}
      />
      <div className="relative p-6 h-32" onClick={onCardClick}>
        <h1 className="text-base font-medium pb-2">{name}</h1>
        <Description text={description} />
      </div>
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

/**
 * May remove this in the future
 */
type DescriptionProps = {
  text: string;
};
function Description({ text }: DescriptionProps) {
  const [expanded, setExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  // Adds the show button when the description is in overflow/line clamp
  const handleResize = () => {
    if (
      ref.current &&
      ref?.current?.offsetHeight < ref?.current?.scrollHeight
    ) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    handleResize();
    // Add event listener on mount
    window.addEventListener("resize", handleResize);
    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onClickShow = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setExpanded(!expanded);
  };

  return (
    <div
      className={`${
        expanded
          ? "absolute p-4 mr-6 rounded-lg border-double border-2 border-stone-500"
          : ""
      } bg-white z-10`}
    >
      <p
        ref={ref}
        className={`text-sm leading-6 ${
          !expanded ? "line-clamp-2" : ""
        } text-gray-400`}
      >
        {text}
      </p>
      <div className="flex justify-end">
        {!expanded && showButton && (
          <Button className="p-0" type="link" onClick={onClickShow}>
            Show More
          </Button>
        )}
        {expanded && (
          <Button className="p-0" type="link" onClick={onClickShow}>
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
}
