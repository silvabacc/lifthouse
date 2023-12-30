import { Button } from "antd";

export default function AddWorkoutCard() {
  return (
    <div className="border-dotted border-2 border-sky-400 bg-white flex items-center cursor-pointer">
      <Button
        type="link"
        className="flex text-sky-400 text-base w-full flex-col items-center justify-center"
      >
        + Add Workout Plan
      </Button>
    </div>
  );
}
