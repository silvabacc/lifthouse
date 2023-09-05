import { useDatabase } from "@frontend/hooks/useDatabase";
import {
  Button,
  Input,
  InputNumber,
  Space,
  StepProps,
  Steps,
  Typography,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";
import {
  CarouselContainer,
  DeleteButton,
  EditButton,
  HistoryTitleContainer,
} from "./HistoryStyles";
import Loading from "../common/Loading";
import dayjs from "dayjs";
import { LogEntry } from "@backend/types";

interface HistoryProps {
  exerciseId: string;
}

const { TextArea } = Input;
const { Text, Title } = Typography;

const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory, deleteLogEntry, updateLogEntries } =
    useDatabase();
  const [exerciseHistory, setExerciseHistory] = useState<LogEntry[]>([]);
  const [updatedEntries, setUpdatedEntries] = useState<LogEntry[]>([]);
  const { data, refetch } = getExerciseHistory(exerciseId);
  const [isEditing, setEditing] = useState(false);

  const onDeleteEntry = async (logEntryId?: string) => {
    if (!logEntryId) {
      return;
    }

    const isSuccess = await deleteLogEntry(logEntryId);
    if (isSuccess) {
      refetch();
    }
  };

  useEffect(() => {
    if (data) {
      setExerciseHistory(data);
    }
  }, [data]);

  if (exerciseHistory === undefined) {
    return <Loading />;
  }

  if (exerciseHistory.length === 0) {
    return <Text>No records found for this exercise</Text>;
  }

  const onSave = () => {
    setEditing(false);
    updateLogEntries(updatedEntries);
  };

  const onChange = (
    entryId: string | undefined,
    set: number,
    value: number | null,
    type: "weight" | "reps"
  ) => {
    if (!value || !entryId) {
      return;
    }

    const newExerciseHistory = exerciseHistory
      .slice()
      .filter((i) => i.logEntryId !== entryId);
    const entryToUpdate = exerciseHistory.find((i) => i.logEntryId === entryId);
    const index = exerciseHistory.findIndex((i) => i.logEntryId === entryId);

    if (!entryToUpdate) {
      return;
    }

    const entry = entryToUpdate.info[set - 1];

    type === "weight" ? (entry.weight = value) : (entry.reps = value);

    setUpdatedEntries((prev) => [...prev, entryToUpdate]);

    newExerciseHistory.splice(index, 0, entryToUpdate);
    setExerciseHistory(newExerciseHistory);
  };

  const settings = {
    dots: true,
    adaptiveHeight: true,
    infinite: false,
    speed: 100,
  };

  return (
    <>
      <Slider {...settings}>
        {exerciseHistory.map((entry, index) => {
          const stepItems: StepProps[] = entry.info.map((i) => {
            return {
              title: `Set ${i.set}`,
              description: (
                <Space>
                  <InputNumber
                    readOnly={!isEditing}
                    prefix="kg"
                    defaultValue={i.weight}
                    onChange={(value) =>
                      onChange(entry.logEntryId, i.set, value, "weight")
                    }
                  />
                  <InputNumber
                    readOnly={!isEditing}
                    prefix="reps"
                    defaultValue={i.reps}
                    onChange={(value) =>
                      onChange(entry.logEntryId, i.set, value, "reps")
                    }
                  />
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
                    {!isEditing && (
                      <Space>
                        <EditButton
                          onClick={() => setEditing((prev) => !prev)}
                          type="ghost"
                          icon={<EditOutlined />}
                        />
                        <DeleteButton
                          type="ghost"
                          icon={<DeleteOutlined />}
                          onClick={() => onDeleteEntry(entry.logEntryId)}
                        />
                      </Space>
                    )}
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
                    readOnly={!isEditing}
                    autoSize={{ minRows: 3, maxRows: 5 }}
                  />
                </div>
                {isEditing && (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button type="primary" onClick={onSave}>
                      Save
                    </Button>
                  </div>
                )}
              </CarouselContainer>
            </div>
          );
        })}
      </Slider>
    </>
  );
};

export default History;
