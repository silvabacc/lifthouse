import { Button, Divider, Modal } from "antd";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useWorkout } from "../useWorkout";
import { useRouter } from "next/navigation";
import { Workout } from "@/lib/supabase/db/types";

const { confirm } = Modal;

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
  onDelete: (id: number) => void;
};
export default function WorkoutCard({
  name,
  description,
  workoutId,
  onDelete,
}: WorkoutCardProps) {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col justify-between bg-white cursor-pointer"
    >
      <div className="relative p-6 h-32">
        <h1 className="text-base font-medium pb-2">{name}</h1>
        <Description text={description} />
      </div>
      <div className="flex items-center justify-between py-2 bg-gray-50">
        <Button className="flex-1 text-gray-400" type="link">
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
    </motion.div>
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
          <Button className="p-0" type="link" onClick={() => setExpanded(true)}>
            Show More
          </Button>
        )}
        {expanded && (
          <Button
            className="p-0"
            type="link"
            onClick={() => setExpanded(false)}
          >
            Show Less
          </Button>
        )}
      </div>
    </div>
  );
}
