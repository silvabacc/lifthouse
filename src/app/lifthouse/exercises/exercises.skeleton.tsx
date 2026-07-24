import { Skeleton } from "antd";

export default function ExerciseCardSkeleton() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-solid border-gray-100 bg-white p-5"
        >
          <Skeleton active title paragraph={{ rows: 1, width: "40%" }} />
        </div>
      ))}
    </div>
  );
}
