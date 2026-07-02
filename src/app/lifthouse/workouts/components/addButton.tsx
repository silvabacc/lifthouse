import { Button } from "antd";
type AddExerciseButtonProps = {
  title: string;
  onClick?: () => void;
};

export default function AddButton({ title, onClick }: AddExerciseButtonProps) {
  return (
    <div className="border-dotted border-2 border-sky-400 bg-white flex items-center cursor-pointer">
      <Button
        onClick={onClick}
        type="link"
        style={{ color: "#0ea5e9" }}
        className="flex text-base w-full flex-col items-center justify-center"
      >
        {title}
      </Button>
    </div>
  );
}
