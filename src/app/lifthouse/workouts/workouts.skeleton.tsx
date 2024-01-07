import { Skeleton } from "antd";

export default function WorkoutSkeleton() {
  const CardSkeleton = () => <Skeleton className="bg-white p-4" active />;

  return (
    <div className="grid lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
