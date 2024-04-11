import { PersonalBest } from "@/lib/supabase/db/types";
import { Space, Typography, notification } from "antd";

const { Text } = Typography;

export function NotificationMessage() {
  return (
    <div className="font-bold">
      You have completed a 531 cycle, your personal bests have been increased
    </div>
  );
}

type NotificationDescriptionProps = {
  exercises: PersonalBest[];
};
export function NotificationDescription({
  exercises,
}: NotificationDescriptionProps) {
  return (
    <Space direction="vertical">
      {exercises.map((info) => (
        <div className="flex justify-between " key={info.exercise.exerciseId}>
          <Text className="w-36" ellipsis={{ tooltip: "I am ellipsis now!" }}>
            {info.exercise.name}
          </Text>
          <div>
            <span className="text-blue-500 font-bold">{info.pb} kg</span>
            <span className="text-green-500"> (+2)</span>
          </div>
        </div>
      ))}
    </Space>
  );
}
