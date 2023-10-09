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
import {
  DeleteOutlined,
  EditOutlined,
  PlusSquareOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
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
import colors from "@frontend/theme/colors";

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
  const { isLoading, data } = getExerciseHistory(exerciseId);
  const [isEditing, setEditing] = useState(false);

  const onDeleteEntry = async (logEntryId?: string) => {
    if (!logEntryId) {
      return;
    }

    const isSuccess = await deleteLogEntry(logEntryId);
    if (isSuccess) {
      const newExerciseHistory = exerciseHistory.slice();
      const index = exerciseHistory.findIndex(
        (i) => i.logEntryId === logEntryId
      );
      newExerciseHistory.splice(index, 1);
      setExerciseHistory(newExerciseHistory);
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      setExerciseHistory(data);
    }
  }, [isLoading]);

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

  const onNotesChange = (notes: string, entryId: string | undefined) => {
    if (!notes) {
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

    entryToUpdate.notes = notes;

    setUpdatedEntries((prev) => [
      ...prev.filter((prev) => prev.logEntryId !== entryId),
      entryToUpdate,
    ]);

    newExerciseHistory.splice(index, 0, entryToUpdate);
    setExerciseHistory(newExerciseHistory);
  };

  const onAddSet = (entryId: string | undefined) => {
    const newExerciseHistory = exerciseHistory
      .slice()
      .filter((i) => i.logEntryId !== entryId);
    const entryToUpdate = exerciseHistory.find((i) => i.logEntryId === entryId);
    const index = exerciseHistory.findIndex((i) => i.logEntryId === entryId);

    if (!entryToUpdate) {
      return;
    }

    entryToUpdate.info.push({
      set: entryToUpdate.info.length + 1,
      weight: 0,
      reps: 0,
    });

    setUpdatedEntries((prev) => [
      ...prev.filter((prev) => prev.logEntryId !== entryId),
      entryToUpdate,
    ]);

    newExerciseHistory.splice(index, 0, entryToUpdate);
    setExerciseHistory(newExerciseHistory);
  };

  const onDeleteSet = (set: number, entryId: string | undefined) => {
    const newExerciseHistory = exerciseHistory
      .slice()
      .filter((i) => i.logEntryId !== entryId);

    const entryToUpdate = exerciseHistory.find((i) => i.logEntryId === entryId);
    const entryIndex = exerciseHistory.findIndex(
      (i) => i.logEntryId === entryId
    );
    const setIndex = entryToUpdate?.info.findIndex((i) => i.set === set);

    if (!entryToUpdate || setIndex === undefined) {
      return;
    }

    entryToUpdate.info.splice(setIndex, 1);

    entryToUpdate.info.forEach((i, index) => {
      i.set = index + 1;
    });

    setUpdatedEntries((prev) => [
      ...prev.filter((prev) => prev.logEntryId !== entryId),
      entryToUpdate,
    ]);

    newExerciseHistory.splice(entryIndex, 0, entryToUpdate);
    setExerciseHistory(newExerciseHistory);
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

    setUpdatedEntries((prev) => [
      ...prev.filter((prev) => prev.logEntryId !== entryId),
      entryToUpdate,
    ]);

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
                    value={i.weight}
                    onChange={(value) =>
                      onChange(entry.logEntryId, i.set, value, "weight")
                    }
                  />
                  <InputNumber
                    readOnly={!isEditing}
                    prefix="reps"
                    value={i.reps}
                    onChange={(value) =>
                      onChange(entry.logEntryId, i.set, value, "reps")
                    }
                  />
                  {isEditing && (
                    <Button
                      type="ghost"
                      onClick={() => onDeleteSet(i.set, entry.logEntryId)}
                      style={{ color: colors.delete }}
                      icon={<MinusCircleOutlined />}
                    />
                  )}
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
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {isEditing && (
                    <Button
                      type="ghost"
                      style={{ color: colors.primary }}
                      onClick={() => onAddSet(entry.logEntryId)}
                      icon={<PlusSquareOutlined style={{ fontSize: 18 }} />}
                    />
                  )}
                  <Title level={5} style={{ width: "100%" }}>
                    Notes
                  </Title>
                  <TextArea
                    defaultValue={entry.notes}
                    readOnly={!isEditing}
                    onChange={(e) =>
                      onNotesChange(e.target.value, entry.logEntryId)
                    }
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
