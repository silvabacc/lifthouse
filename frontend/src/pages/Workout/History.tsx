import { useDatabase } from "@frontend/hooks/useDatabase";
import { Card, Space } from "antd";
import React from "react";
import Carousel from "react-multi-carousel";
import HistoryExerciseCard from "./components/HistoryExerciseCard";

interface HistoryProps {
  exerciseId: string;
}

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory } = useDatabase();
  const { data } = getExerciseHistory(exerciseId);

  if (data === undefined) {
    return <>Loading...</>;
  }

  console.log(data);

  return (
    <Carousel
      arrows={false}
      responsive={{
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        },
      }}
    >
      {data?.map((entry) => {
        return (
          <HistoryExerciseCard>
            <Space direction="horizontal">
              {entry.info.map((i) => {
                return i.set;
              })}
            </Space>
          </HistoryExerciseCard>
        );
      })}
    </Carousel>
  );
};

export default History;
