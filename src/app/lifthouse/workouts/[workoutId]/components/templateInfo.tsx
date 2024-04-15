import { Typography } from "antd";
import { templateInfo, templateName } from "../utils";
import { WorkoutTemplate } from "@/lib/supabase/db/types";

const { Text } = Typography;

export default function TemplateInfo() {
  return (
    <div>
      <h1>Template Info</h1>
      <Text className="text-gray-600">
        With templates, you can easily create or apply pre-configured workout
        plans to suit with your goals. Each template will have its own sets of
        exercise, sets and rep schemes, which you can adjust. The template will
        give you options on what exercises to do and how many sets and reps to
        do.
      </Text>
      {Object.keys(templateInfo).map((key) => (
        <div key={key}>
          <h3>{templateName[key as WorkoutTemplate]}</h3>
          <Text>{templateInfo[key as WorkoutTemplate]}</Text>
        </div>
      ))}
    </div>
  );
}
