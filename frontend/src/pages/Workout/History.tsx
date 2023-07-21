import { useDatabase } from "@frontend/hooks/useDatabase";
import { InputNumber, Space, StepProps, Steps, Typography } from "antd";
import React from "react";
import { CarouselButtons, HistoryContainer } from "./HistoryStyles";
import moment from "moment";
import { Carousel } from "react-responsive-carousel";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

interface HistoryProps {
  exerciseId: string;
}

const { Text } = Typography;

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory } = useDatabase();
  const { data } = getExerciseHistory(exerciseId);

  if (data === undefined) {
    return <>Loading...</>;
  }

  if (data.length === 0) {
    return <Text>No records found for this exercise</Text>;
  }

  return (
    <Carousel
      showThumbs={false}
      swipeable={false}
      renderArrowNext={(clickHandler: () => void, hasNext: boolean) => {
        if (hasNext) {
          return (
            <CarouselButtons onClick={clickHandler}>
              <DownOutlined />
            </CarouselButtons>
          );
        }
      }}
      renderArrowPrev={(clickHandler: () => void, hasPrev: boolean) => {
        if (hasPrev) {
          return (
            <CarouselButtons onClick={clickHandler}>
              <UpOutlined />
            </CarouselButtons>
          );
        }
      }}
      showIndicators={false}
      showStatus={false}
      axis="vertical"
    >
      {data?.map((entry) => {
        let HEIGHT;
        const stepItems: StepProps[] = entry.info.map((i) => {
          HEIGHT = entry.info.length * 90;
          return {
            title: `Set ${i.set}`,
            description: (
              <HistoryContainer>
                <InputNumber readOnly prefix="kg" value={i.weight} />
                <InputNumber readOnly prefix="reps" value={i.reps} />
              </HistoryContainer>
            ),
          };
        });
        return (
          <Space direction="vertical" key={entry.exerciseId}>
            <Text>{moment(entry.date).format("Do MMMM YYYY")}</Text>
            <Steps
              direction="vertical"
              style={{ height: HEIGHT }}
              items={stepItems}
            />
          </Space>
        );
      })}
    </Carousel>
  );
};

export default History;
