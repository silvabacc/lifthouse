import { Skeleton } from "antd";

export default function WorkoutSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-solid border-gray-100 bg-white p-5"
        >
          <Skeleton active paragraph={{ rows: 2 }} />
        </div>
      ))}
    </div>
  );
}
