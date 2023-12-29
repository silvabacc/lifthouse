import { Button, Divider } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
};
export default function WorkoutCard({ name, description }: WorkoutCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.25 }}
      className="flex flex-col justify-between bg-white cursor-pointer"
    >
      <div className="p-6">
        <h1 className="text-base font-medium pb-2">{name}</h1>
        <Description text={description} />
      </div>
      <div className="flex items-center justify-between py-2 bg-gray-50">
        <Button className="flex-1" type="link">
          Edit
        </Button>
        <Divider type="vertical" />
        <Button className="flex-1" type="link">
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
  const maxLength = 100;
  const [expanded, setExpanded] = useState(false);

  const truncatedText = expanded ? text : text.slice(0, maxLength);

  return (
    <div>
      <p className="text-sm text-gray-400">{`${truncatedText} ${
        text.length > maxLength && !expanded ? "..." : ""
      }`}</p>
      <div className="flex justify-end">
        {!expanded && text.length > maxLength && (
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
