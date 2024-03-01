import { Skeleton } from "antd";

export default function ExerciseCardSkeleton() {
  const CardSkeleton = () => <Skeleton className="bg-white p-4" active />;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
