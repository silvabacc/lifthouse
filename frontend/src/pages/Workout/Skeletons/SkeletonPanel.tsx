import { Skeleton } from "antd";
import React from "react";

interface SkeletonCollapse {
  loading: boolean;
}
const SkeletonPanel: React.FC<SkeletonCollapse> = ({ loading }) => {
  if (!loading) {
    return <></>;
  }

  return (
    <>
      {Array.from(Array(10)).map((_, index) => (
        <div
          key={index}
          style={{
            border: "#f0f0f0",
            borderStyle: "solid",
            padding: 16,
            borderRadius: 4,
            width: "100%",
            margin: 4,
          }}
        >
          <Skeleton paragraph={{ rows: 1 }} />
        </div>
      ))}
    </>
  );
};

export default SkeletonPanel;
