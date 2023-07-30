import { useDatabase } from "@frontend/hooks/useDatabase";
import { Input, InputNumber, Space, StepProps, Steps, Typography } from "antd";
import Slider from "react-slick";
import React, { useRef, useState } from "react";
import {
  CarouselButtons,
  CarouselContainer,
  HistoryStepsContainer,
} from "./HistoryStyles";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import Loading from "../common/Loading";
import dayjs from "dayjs";
import { Splide, SplideSlide } from "@splidejs/react-splide";

interface HistoryProps {
  exerciseId: string;
}

const { TextArea } = Input;

const { Text, Title } = Typography;

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory } = useDatabase();
  const { data } = getExerciseHistory(exerciseId);
  const [active, setActive] = useState(0);
  const splideRef = useRef<Splide>(null);

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
    }, 0) * 110;

  const onClickNext = () => splideRef.current && splideRef.current.go("+1");
  const onClickPrev = () => splideRef.current && splideRef.current.go("-1");

  return (
    <>
      {active !== 0 && (
        <CarouselButtons onClick={onClickPrev}>
          <UpOutlined />
        </CarouselButtons>
      )}
      <Splide
        onMove={(e) => setActive(e.index)}
        ref={splideRef}
        options={{
          direction: "ttb",
          height: HEIGHT,
          arrows: false,
          pagination: false,
          drag: false,
        }}
      >
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
            <SplideSlide key={index}>
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
            </SplideSlide>
          );
        })}
      </Splide>
      {active !== data.length - 1 && (
        <CarouselButtons onClick={onClickNext}>
          <DownOutlined />
        </CarouselButtons>
      )}
    </>
  );
};

export default History;
