import { PlusOutlined } from "@ant-design/icons";

type AddExerciseButtonProps = {
  title: string;
  onClick?: () => void;
};

export default function AddButton({ title, onClick }: AddExerciseButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-indigo-200 bg-white py-4 text-base font-medium text-indigo-600 transition-colors hover:border-indigo-400 hover:bg-indigo-50/40"
    >
      <PlusOutlined />
      {title.replace(/^\+\s*/, "")}
    </button>
  );
}
