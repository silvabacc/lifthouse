import { useDatabase } from "@frontend/hooks/useDatabase";
import { Input, InputNumber, StepProps, Steps, Typography } from "antd";
import Slider from "react-slick";
import React from "react";
import { CarouselContainer, HistoryStepsContainer } from "./HistoryStyles";
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

  const settings = {
    dots: true,
    adaptiveHeight: true,
    infinite: false,
    speed: 100,
  };

  return (
    <>
      <Slider {...settings}>
        {data?.map((entry, index) => {
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
            <div key={index}>
              <CarouselContainer direction="vertical" key={entry.exerciseId}>
                <div>
                  <Title level={5}>
                    {dayjs(entry.date).format("Do MMMM YYYY")}
                  </Title>
                  <Steps direction="vertical" items={stepItems} />
                  {entry.info.length === 0 && (
                    <Text>No sets were recorded for this entry</Text>
                  )}
                </div>
                <div
                  style={{
                    marginTop: 16,
                    width: "100%",
                    visibility: entry.notes ? "visible" : "hidden",
                  }}
                >
                  <Title level={5}>Notes</Title>
                  <TextArea
                    value={entry.notes}
                    readOnly
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
              </CarouselContainer>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default History;
