import { Skeleton } from "antd";

export default function ExerciseCardSkeleton() {
  return (
    <div className="p-4 h-full">
      <Skeleton />
      <div className="animate-pulse bg-gray-200 rounded-lg mt-4 h-72" />
    </div>
  );
}
