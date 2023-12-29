import { Button, Divider } from "antd";

type WorkoutCardProps = {
  name: string;
  description: string;
  workoutId: number;
};
export default function WorkoutCard({ name, description }: WorkoutCardProps) {
  return (
    <div className="flex flex-col justify-between bg-white">
      <div className="p-6">
        <h1 className="text-base font-medium pb-2">{name}</h1>
        <p className="text-sm text-gray-400">{description}</p>
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
    </div>
  );
}
