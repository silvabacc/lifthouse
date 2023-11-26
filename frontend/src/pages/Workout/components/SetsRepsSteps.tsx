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
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useWorkout } from "../useWorkout";
import { useWorkoutContext } from "../WorkoutContext";
import { CheckCircleOutlined } from "@ant-design/icons";

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
  const { setExercisesFinished } = useWorkoutContext();

  const { data } = getExerciseHistory([exercise.exerciseId], 1);

  useEffect(() => {
    if (data) {
      setLastEntryData(data[0]);
    }
  }, [data]);

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      const temporaryStorage = (await fetchTempData) as LogEntry;

      setCurrentSet(
        temporaryStorage?.info[temporaryStorage.info?.length - 1].set || 0
      );
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

  const onComplete = () => {
    setCurrentSet(exercise.sets + 1);
  };

  useEffect(() => {
    if (currentSet >= exercise.sets) {
      setExercisesFinished((prev) => [...prev, exercise.exerciseId]);
    } else if (currentSet !== 0) {
      setExercisesFinished((prev) =>
        prev.filter((id) => id !== exercise.exerciseId)
      );
    }
  }, [currentSet]);

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
      <div style={{ display: "flex", justifyContent: "center", marginTop: 16 }}>
        {currentSet === exercise.sets - 1 && (
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            onClick={onComplete}
          >
            Complete
          </Button>
        )}
      </div>
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
    setWeight(value || 0);
  };

  const handleOnChangeReps = (value: number | null) => {
    setReps(value || 0);
  };

  return (
    <>
      <Space>
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          onChange={handleOnChangeWeight}
          value={weight}
          min={0}
          placeholder={placeHolderInfo?.weight.toString()}
          prefix="kg"
        />
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          min={0}
          onChange={handleOnChangeReps}
          placeholder={placeHolderInfo?.reps.toString()}
          prefix="reps"
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
