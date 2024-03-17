import { Skeleton } from "antd";

export default function FiveThreeOneSkeleton() {
  const CardSkeleton = () => <Skeleton className="bg-white p-4" active />;

  return (
    <div>
      <div className="grid lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
      <Skeleton className="bg-white mt-4 p-4" />
      <Skeleton className="bg-white h-96 mt-4 p-4" />
    </div>
  );
}
