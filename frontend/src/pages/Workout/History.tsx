import { useDatabase } from "@frontend/hooks/useDatabase";
import { Input, InputNumber, Space, StepProps, Steps, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import React from "react";
import {
  CarouselContainer,
  DeleteButton,
  HistoryTitleContainer,
} from "./HistoryStyles";
import Loading from "../common/Loading";
import dayjs from "dayjs";
import colors from "@frontend/theme/colors";

interface HistoryProps {
  exerciseId: string;
}

const { TextArea } = Input;
const { Text, Title } = Typography;

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory, deleteLogEntry } = useDatabase();
  const { data, refetch } = getExerciseHistory(exerciseId);

  const onDeleteEntry = async (logEntryId: string) => {
    const isSuccess = await deleteLogEntry(logEntryId);
    if (isSuccess) {
      refetch();
    }
  };

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
                <Space>
                  <InputNumber readOnly prefix="kg" value={i.weight} />
                  <InputNumber readOnly prefix="reps" value={i.reps} />
                </Space>
              ),
            };
          });

          return (
            <div key={index}>
              <CarouselContainer direction="vertical" key={entry.exerciseId}>
                <div>
                  <HistoryTitleContainer>
                    <Title level={5}>
                      {dayjs(entry.date).format("Do MMMM YYYY")}
                    </Title>
                    <DeleteButton
                      type="ghost"
                      icon={<DeleteOutlined color={colors.delete} />}
                      onClick={() => onDeleteEntry(entry.logEntryId!)}
                    />
                  </HistoryTitleContainer>
                  <Steps
                    style={{ alignItems: "center" }}
                    direction="vertical"
                    items={stepItems}
                  />
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
