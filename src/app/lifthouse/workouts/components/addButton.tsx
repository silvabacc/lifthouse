import { Button } from "antd";
type AddExerciseButtonProps = {
  title: string;
  onClick?: () => void;
};

export default function AddButton({ title, onClick }: AddExerciseButtonProps) {
  return (
    <div className="add-button border-dotted border-2 border-sky-400 bg-white flex items-center cursor-pointer">
      <Button
        onClick={onClick}
        type="link"
        className="flex text-sky-400 text-base w-full flex-col items-center justify-center"
      >
        {title}
      </Button>
    </div>
  );
}
