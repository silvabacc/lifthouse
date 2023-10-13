import { Skeleton } from "antd";
import React from "react";

interface SkeletonHistoryProps {
  loading: boolean;
}
const SkeletonNode: React.FC<SkeletonHistoryProps> = ({ loading }) => {
  if (!loading) {
    return <></>;
  }

  return (
    <>
      <div
        style={{
          border: "#f0f0f0",
          borderStyle: "solid",
          padding: 16,
          borderRadius: 4,
          width: "100%",
          margin: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Skeleton paragraph={{ rows: 0 }} />
        <Skeleton.Node style={{ width: 200, height: 200 }} active>
          <></>
        </Skeleton.Node>
      </div>
    </>
  );
};

export default SkeletonNode;
