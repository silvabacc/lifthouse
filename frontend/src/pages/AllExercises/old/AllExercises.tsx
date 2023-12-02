import React, { useEffect, useMemo, useRef, useState } from "react";
import { Card, Col, Row, Typography } from "antd";
import { Exercise } from "@backend/types";
import { useAllExercises } from "./useAllExercise";
import { AllExerciseContainer } from "./AllExercises.style";
import getConfig from "../../../../config";
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Card;

const { SUPABASE_URL, BUCKET_URL } = getConfig();

const AllExercises: React.FC = () => {
  const { fetchAllExercises } = useAllExercises();
  const [page, setPage] = useState(0);
  const { data } = fetchAllExercises(page);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    if (data) {
      setExercises((prev) => [...prev, ...data]);
    } else {
      setPage(1);
    }
  }, [data]);

  return (
    <InfiniteScroll
      dataLength={exercises.length}
      next={() => {
        if (data) {
          setPage((prev) => prev + 1);
        }
      }}
      hasMore={exercises.length <= 166}
      loader={<h4>Loading...</h4>}
    >
      <Row gutter={[6, 6]}>
        {exercises.map((exercise) => {
          const bucketUrl = `${SUPABASE_URL}/${BUCKET_URL}/${exercise.exerciseId}_1.jpeg`;
          return (
            <Col key={exercise.exerciseName} span={12}>
              <Card
                cover={
                  <img
                    style={{ height: 200, objectFit: "cover" }}
                    src={bucketUrl}
                  />
                }
                style={{ height: "100%" }}
              >
                <Meta title={exercise.exerciseName} />
              </Card>
            </Col>
          );
        })}
      </Row>
    </InfiniteScroll>
  );
};

export default AllExercises;
