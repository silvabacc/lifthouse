import {
  Button,
  Input,
  InputNumber,
  Space,
  StepProps,
  Steps,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Info, LogEntry, RoutineExercise } from "@backend/types";
import { CheckSquareOutlined } from "@ant-design/icons";
import colors from "@frontend/theme/colors";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useWorkout } from "../useWorkout";
import { useScreen } from "@frontend/hooks/useScreen";
import { get } from "http";

const { Title } = Typography;
const { TextArea } = Input;

interface SetsRepsStepsProps {
  exercise: RoutineExercise;
}

export const SetsRepsSteps: React.FC<SetsRepsStepsProps> = ({ exercise }) => {
  const [currentSet, setCurrentSet] = useState(0);
  const { getTemporaryStorage } = useTemporaryStorage();
  const fetchTempData = getTemporaryStorage(exercise.exerciseId);
  const [temporaryData, setTemporaryData] = useState<LogEntry>();
  const [lastEntryData, setLastEntryData] = useState<LogEntry>();

  const { getExerciseHistory } = useWorkout();

  const { data } = getExerciseHistory([exercise.exerciseId], 1);

  useEffect(() => {
    if (data) {
      setLastEntryData(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      const temporaryStorage = await fetchTempData;
      setTemporaryData(temporaryStorage);
    };

    fetchTemporaryStorage();
  }, []);

  const onChange = (value: number) => {
    setCurrentSet(value);
  };

  const onClick = () => {
    setCurrentSet(currentSet + 1);
  };

  const items: StepProps[] = [];
  for (let i = 0; i < exercise.sets; i++) {
    items.push({
      title: `Set ${i + 1}`,
      description: (
        <StepRow
          exerciseId={exercise.exerciseId}
          temporaryData={temporaryData}
          history={lastEntryData}
          step={i}
          disabled={currentSet !== i}
          onClick={onClick}
        />
      ),
    });
  }

  return (
    <div style={{ flex: 1 }}>
      <Steps
        current={currentSet}
        onChange={onChange}
        direction="vertical"
        items={items}
      />
      <Title level={5}>Notes</Title>
      <Notes
        exerciseId={exercise.exerciseId}
        value={temporaryData?.notes}
        placeHolder={lastEntryData?.notes}
      />
    </div>
  );
};

interface StepsRowProps {
  exerciseId: string;
  temporaryData?: LogEntry;
  history?: LogEntry;
  step: number;
  disabled: boolean;
  placeHolderInfo?: Info;
  onClick: () => void;
}

const StepRow: React.FC<StepsRowProps> = ({
  exerciseId,
  temporaryData,
  history,
  step,
  disabled,
  onClick,
}) => {
  const { writeTemporaryStorage } = useTemporaryStorage();

  const placeHolderInfo = history?.info?.[step];

  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();

  useEffect(() => {
    writeTemporaryStorage(exerciseId, {
      set: step + 1,
      reps: reps || 0,
      weight: weight || 0,
    });
  }, [reps, weight]);

  useEffect(() => {
    if (temporaryData) {
      const info = temporaryData.info.find((i) => i.set === step + 1);
      setWeight(info?.weight);
      setReps(info?.reps);
    }
  }, [temporaryData]);

  const handleOnChangeWeight = (value: number | null) => {
    if (value || value === 0) {
      setWeight(value);
    }
  };

  const handleOnChangeReps = (value: number | null) => {
    if (value || value === 0) {
      setReps(value);
    }
  };

  return (
    <>
      <Space>
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          onChange={handleOnChangeWeight}
          value={weight}
          placeholder={placeHolderInfo?.weight.toString()}
          prefix="kg"
        />
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          onChange={handleOnChangeReps}
          placeholder={placeHolderInfo?.reps.toString()}
          prefix="reps"
        />
        <Button
          disabled={disabled}
          style={{ color: disabled ? colors.grey : colors.primary }}
          type="ghost"
          onClick={onClick}
          icon={<CheckSquareOutlined size={24} />}
        />
      </Space>
    </>
  );
};

interface NotesProps {
  exerciseId: string;
  value?: string;
  placeHolder?: string;
}
const Notes: React.FC<NotesProps> = ({ exerciseId, value, placeHolder }) => {
  const [notes, setNotes] = useState<string>();
  const { writeTemporaryStorage } = useTemporaryStorage();

  useEffect(() => {
    if (notes) {
      writeTemporaryStorage(exerciseId, undefined, notes);
    }
  }, [notes]);

  useEffect(() => {
    setNotes(value);
  }, [value]);

  return (
    <TextArea
      value={notes}
      placeholder={placeHolder}
      onChange={(e) => setNotes(e.target.value)}
      autoSize={{ minRows: 3, maxRows: 5 }}
    />
  );
};
