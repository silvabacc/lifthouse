import { useDatabase } from "@frontend/hooks/useDatabase";
import { Input, InputNumber, Space, StepProps, Steps, Typography } from "antd";
import React from "react";
import {
  CarouselButtons,
  HistoryContainer,
  HistoryStepsContainer,
} from "./HistoryStyles";
import { Carousel } from "react-responsive-carousel";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Loading from "../common/Loading";
import dayjs from "dayjs";

interface HistoryProps {
  exerciseId: string;
}

const { TextArea } = Input;

const { Text, Title } = Typography;

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory } = useDatabase();
  const { data } = getExerciseHistory(exerciseId);

  if (data === undefined) {
    return <Loading />;
  }

  if (data.length === 0) {
    return <Text>No records found for this exercise</Text>;
  }

  const HEIGHT =
    data.reduce((acc, curr) => {
      if (curr.info.length > acc) {
        return curr.info.length;
      }
      return acc;
    }, 0) * 100;

  const HistoryContainerElement = HistoryContainer(HEIGHT);

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
        const stepItems: StepProps[] = entry.info.map((i) => {
          return {
            title: `Set ${i.set}`,
            description: (
              <HistoryStepsContainer>
                <InputNumber readOnly prefix="kg" value={i.weight} />
                <InputNumber readOnly prefix="reps" value={i.reps} />
              </HistoryStepsContainer>
            ),
          };
        });

        return (
          <HistoryContainerElement>
            <Space direction="vertical" key={entry.exerciseId}>
              <Title level={5}>
                {dayjs(entry.date).format("Do MMMM YYYY")}
              </Title>
              <Steps direction="vertical" items={stepItems} />
              {entry.info.length === 0 && (
                <Text>No sets were recorded for this entry</Text>
              )}
            </Space>
            {entry.notes && (
              <Space style={{ marginTop: 16 }} direction="vertical">
                <Title level={5}>Notes</Title>
                <TextArea
                  value={entry.notes}
                  readOnly
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
              </Space>
            )}
          </HistoryContainerElement>
        );
      })}
    </Carousel>
  );
};

export default History;
