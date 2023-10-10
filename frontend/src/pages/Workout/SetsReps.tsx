import React, { useEffect, useState } from "react";
import { Input, Space, StepProps, Steps } from "antd";
import SetsRepsRow from "./SetsRepsRow";
import WorkoutButton from "./components/WorkoutButton";
import { Exercise, LogEntry } from "@backend/types";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useWorkout } from "./useWorkout";

interface SetsRepsProps {
  exercise: Exercise;
  sets: number;
}

const { TextArea } = Input;

const SetsReps: React.FC<SetsRepsProps> = ({ exercise, sets }) => {
  const [current, setCurrent] = useState(0);
  const { getTemporaryStorage, removeSetFromExercise, writeTemporaryStorage } =
    useTemporaryStorage();
  const { getExerciseHistory } = useWorkout();
  const { data: placeHolderInfo } = getExerciseHistory(exercise.exerciseId, 1);
  const tempData = getTemporaryStorage(exercise.exerciseId);
  const [temporaryStorage, setTemporaryStorage] = useState<LogEntry>();
  const [notes, setNotes] = useState<string>();

  useEffect(() => {
    const fetchTemporaryStorage = async () => {
      setTemporaryStorage(await tempData);
      setNotes((await tempData)?.notes || "");
    };

    fetchTemporaryStorage();
  }, []);

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
          overrideWeights={info?.weight}
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

  console.log(placeHolderInfo);

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Steps
        style={{ alignItems: "center" }}
        direction="vertical"
        current={current}
        items={stepItems}
      />
      <TextArea
        placeholder={placeHolderInfo ? placeHolderInfo?.[0]?.notes : "Notes..."}
        value={notes}
        onChange={handleOnChangeNotes}
        autoSize={{ minRows: 3, maxRows: 5 }}
      />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <WorkoutButton
          onClick={() => {
            removeSetFromExercise(exercise.exerciseId, current);
            setCurrent((prev) => prev - 1);
          }}
          disabled={current === 0}
        >
          Previous Set
        </WorkoutButton>
      </div>
    </Space>
  );
};

export default SetsReps;
