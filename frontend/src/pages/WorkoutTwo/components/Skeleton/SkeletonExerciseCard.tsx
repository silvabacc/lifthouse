import { Col, Row, Skeleton } from "antd";
import React from "react";
import { gridGutter } from "../../constants";

const SkeletonExerciseCard: React.FC = () => {
  return (
    <Row style={{ marginTop: 16 }} gutter={[gridGutter, gridGutter]}>
      {Array.from(Array(12)).map(() => (
        <Col span={8}>
          <div
            style={{
              borderStyle: "solid",
              borderColor: "#f0f0f0",
              padding: 16,
            }}
          >
            <Skeleton active />
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SkeletonExerciseCard;
