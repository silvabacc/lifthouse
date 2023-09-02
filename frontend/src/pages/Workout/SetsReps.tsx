import React, { useEffect, useState } from "react";
import { Input, Space, StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./components/WorkoutButton";
import { Exercise, LogEntry } from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useDatabase } from "@frontend/hooks/useDatabase";

interface SetsRepsProps {
  exercise: Exercise;
  sets: number;
}

const { TextArea } = Input;

const SetsReps: React.FC<SetsRepsProps> = ({ exercise, sets }) => {
  const [current, setCurrent] = useState(0);
  const { getTemporaryStorage, removeSetFromExercise, writeTemporaryStorage } =
    useTemporaryStorage();
  const { getExerciseHistory } = useDatabase();
  const { data: placeHolderInfo } = getExerciseHistory(exercise.exerciseId, 1);
  const tempData = getTemporaryStorage(exercise.exerciseId);
  const [temporaryStorage, setTemporaryStorage] = useState<LogEntry>();
  const [notes, setNotes] = useState<string>();

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      setTemporaryStorage(await tempData);
    };

    fetchTemporaryStorage();
  }, [tempData]);

  const handleOnChangeNotes = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
    writeTemporaryStorage(exercise.exerciseId, undefined, e.target.value);
  };

  const stepItems: StepProps[] = [];

  for (let i = 0; i < sets; i++) {
    const info =
      temporaryStorage?.exerciseId === exercise.exerciseId
        ? temporaryStorage?.info.find((info) => info.set === i + 1)
        : undefined;

    stepItems.push({
      title: `Set ${i + 1}`,
      description: (
        <SetsRepsRow
          set={i + 1}
          placeHolderInfo={placeHolderInfo?.[0]}
          exercise={exercise}
          overrideReps={info?.reps}
          overrideWeights={info?.reps}
          next={setCurrent}
          disabled={i !== current}
        />
      ),
    });
  }

  useEffect(() => {
    if (
      temporaryStorage &&
      temporaryStorage.exerciseId === exercise.exerciseId
    ) {
      setCurrent(temporaryStorage.info.length);
    }
  }, [JSON.stringify(temporaryStorage)]);

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Steps
        style={{ alignItems: "center" }}
        direction="vertical"
        current={current}
        items={stepItems}
      />
      <TextArea
        placeholder="Notes..."
        value={notes}
        onChange={handleOnChangeNotes}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <WorkoutButton
        onClick={() => {
          removeSetFromExercise(exercise.exerciseId, current);
          setCurrent((prev) => prev - 1);
        }}
        disabled={current === 0}
      >
        Previous Set
      </WorkoutButton>
    </Space>
  );
};

export default SetsReps;
