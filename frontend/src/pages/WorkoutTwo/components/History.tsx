import React, { useEffect, useReducer, useRef, useState } from "react";
import { useWorkout } from "../useWorkout";
import { LogEntry } from "@backend/types";
import Slider, { Settings } from "react-slick";
import {
  Button,
  Input,
  InputNumber,
  Skeleton,
  Space,
  StepProps,
  Steps,
  Typography,
  message,
} from "antd";
import { useWorkoutContext } from "../WorkoutContext";
import colors from "@frontend/theme/colors";
import {
  MinusCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  RightCircleOutlined,
  LeftCircleOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useScreen } from "@frontend/hooks/useScreen";

const { Title } = Typography;
const { TextArea } = Input;

/**
 * @param exerciseId - pass this to fetch data its own data
 * @param history - history data but will be overwritten if @param exerciseId is passed
 *
 */

interface HistoryProps {
  page: number;
  onPageChange: (page: number) => void;
  exerciseId?: string;
  history?: LogEntry[];
}

export const History: React.FC<HistoryProps> = ({
  exerciseId,
  history = [],
  page,
  onPageChange,
}) => {
  const { getExerciseHistory, updateLogEntries, deleteLogEntry } = useWorkout();
  const [editHistory, setEditHistory] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [updatedEntries, setUpdatedEntries] = useState<LogEntry[]>([]);
  const [exerciseHistory, setExerciseHistory] = useState<LogEntry[]>([]);
  const slickRef = useRef<Slider>(null);

  useEffect(() => {
    if (exerciseId) {
      setHistoryLoading(true);
      const fetch = async () => {
        const exerciseIds = exerciseId;
        const { data, isLoading } = await getExerciseHistory(
          [exerciseIds],
          page,
          10
        );

        setHistoryLoading(isLoading);
        setExerciseHistory(data || []);
      };

      fetch();
    }
  }, [exerciseId]);

  useEffect(() => {
    if (history.length > 0) {
      setExerciseHistory(history);
    }
  }, [history]);

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

  const onSave = async () => {
    setSaving(true);
    const results = await updateLogEntries(updatedEntries);
    if (results.some((result) => !result)) {
      messageApi.error("Couldn't edit history, please try again");
    }
    setEditHistory(false);
    setSaving(false);
  };

  const settings: Settings = {
    dots: true,
    adaptiveHeight: true,
    infinite: false,
    speed: 100,
  };

  return (
    <div style={{ flex: 1, width: "50%", marginBottom: 16 }}>
      {contextHolder}
      {historyLoading && <SkeletonHistory />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <Button
          icon={<LeftCircleOutlined />}
          onClick={() => {
            slickRef.current?.slickPrev();
            if (page > 0) {
              onPageChange(page - 1);
            }
          }}
        />
        <Button
          icon={<RightCircleOutlined />}
          onClick={() => {
            slickRef.current?.slickNext();
            onPageChange(page + 1);
          }}
        />
      </div>
      <Slider ref={slickRef} {...settings}>
        {exerciseHistory.map((entry, idx) => {
          const items: StepProps[] = entry.info.map((i) => ({
            title: `Set ${i.set}`,
            description: (
              <Space>
                <InputNumber
                  readOnly={!editHistory}
                  inputMode="decimal"
                  prefix="kg"
                  value={i.weight}
                  onChange={(value) =>
                    onChange(entry.logEntryId, i.set, value, "weight")
                  }
                />
                <InputNumber
                  readOnly={!editHistory}
                  inputMode="decimal"
                  prefix="reps"
                  value={i.reps}
                  onChange={(value) =>
                    onChange(entry.logEntryId, i.set, value, "reps")
                  }
                />
                {editHistory && (
                  <Button
                    type="ghost"
                    onClick={() => onDeleteSet(i.set, entry.logEntryId)}
                    style={{ color: colors.delete }}
                    icon={<MinusCircleOutlined />}
                  />
                )}
              </Space>
            ),
          }));

          return (
            <div key={`${entry.logEntryId}-${idx}`}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={5}>
                  {dayjs(entry.date).format("Do MMMM YYYY")}
                </Title>
                {!editHistory && (
                  <Space>
                    <Button
                      style={{ color: colors.primary }}
                      onClick={() => setEditHistory((prev) => !prev)}
                      type="ghost"
                      icon={<EditOutlined />}
                    />
                    <Button
                      type="ghost"
                      style={{ color: colors.delete }}
                      icon={<DeleteOutlined />}
                      onClick={() => onDeleteEntry(entry.logEntryId)}
                    />
                  </Space>
                )}
              </div>
              <Steps direction="vertical" items={items}></Steps>
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {editHistory && (
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
                  readOnly={!editHistory}
                  onChange={(e) =>
                    onNotesChange(e.target.value, entry.logEntryId)
                  }
                  autoSize={{ minRows: 3, maxRows: 5 }}
                />
                {editHistory && (
                  <Button
                    style={{ marginTop: 16, marginBottom: 16 }}
                    type={saving ? "default" : "primary"}
                    onClick={onSave}
                  >
                    {saving ? "Saving" : "Save"}
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default History;

const SkeletonHistory: React.FC = () => {
  return <Skeleton paragraph={{ rows: 3 }} />;
};
