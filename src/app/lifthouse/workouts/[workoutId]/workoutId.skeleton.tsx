import { Skeleton, Space } from "antd";
import { DotChartOutlined } from "@ant-design/icons";

export default function WorkoutIdSkeleton() {
  return (
    <div className="h-full bg-white p-4 mt-4 h-full rounded-sm">
      <Skeleton active />
      <div className="animate-pulse bg-gray-200 rounded-lg mt-4 h-96" />
      <Skeleton active className="pt-4" title={false} />
    </div>
  );
}
