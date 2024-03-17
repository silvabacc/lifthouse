import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Exercise, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Drawer,
  InputNumber,
  Modal,
  Space,
  StepProps,
  Steps,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useFiveThreeOneContext } from "../context";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedExercise: PersonalBest;
  sets: number;
  reps: number[];
  intensity: number[];
};
export default function CompleteFiveThreeOneModal({
  open,
  onClose,
  selectedExercise,
  sets,
  reps,
  intensity,
}: Props) {
  const {
    getCachedLogInfo,
    clearCacheLogInfo,
    cacheFiveThreeOneInfo,
    getCachedFiveThreeOneInfo,
  } = useLocalStorage();
  const [currentSet, setCurrentSet] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [saving, setSaving] = useState(false);
  const { setWeek, setCompleted } = useFiveThreeOneContext();

  useEffect(() => {
    const highestSet =
      getCachedLogInfo(selectedExercise.exercise.exerciseId)?.info.reduce(
        (acc, curr) => (curr.set > acc ? curr.set : acc),
        0
      ) || 0;

    setCurrentSet(highestSet);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExercise]);

  const items: StepProps[] = [];
  for (let i = 0; i < sets; i++) {
    items.push({
      description: (
        <Row
          info={selectedExercise}
          step={i}
          target={reps[i]}
          intensity={intensity[i]}
          disabled={currentSet !== i}
          warningEnabled={currentSet > i}
          onContinue={() => setCurrentSet(currentSet + 1)}
        />
      ),
    });
  }

  const onChange = (current: number) => {
    if (current < currentSet) {
      setCurrentSet(current);
    }
  };

  const onOk = async () => {
    const info = getCachedLogInfo(selectedExercise.exercise.exerciseId)?.info;
    const cachedFiveThreeOneInfo = getCachedFiveThreeOneInfo();

    const completed = info?.length === sets;
    if (!completed) {
      setShowWarning(true);
      return;
    }

    const { exercise } = selectedExercise;

    const cached = getCachedLogInfo(selectedExercise.exercise.exerciseId);
    const logs = {
      exerciseId: exercise.exerciseId,
      info: cached?.info,
      notes: cached?.notes,
      date: new Date(),
    };

    setSaving(true);

    await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify([logs]),
    });

    if (cachedFiveThreeOneInfo?.completed.length === 3) {
      cacheFiveThreeOneInfo({
        week: cachedFiveThreeOneInfo?.week + 1,
        completed: [],
      });
      setWeek(cachedFiveThreeOneInfo?.week + 1);
      setCompleted([]);
    } else {
      cacheFiveThreeOneInfo({
        week: cachedFiveThreeOneInfo?.week || 1,
        completed: [
          ...(cachedFiveThreeOneInfo?.completed || []),
          exercise.exerciseId,
        ],
      });
      setWeek(cachedFiveThreeOneInfo?.week || 1);
      setCompleted([
        ...(cachedFiveThreeOneInfo?.completed || []),
        exercise.exerciseId,
      ]);
    }

    setSaving(false);

    clearCacheLogInfo([exercise.exerciseId]);

    setShowWarning(false);
    onClose();
  };

  return (
    <Modal
      width={400}
      open={open}
      onCancel={onClose}
      okText={saving ? "Saving" : "Finish"}
      onOk={onOk}
    >
      <div className="flex h-full flex-col">
        <div className="mb-4">
          <span className="text-xs ml-2 mr-6">Set</span>
          <span className="text-xs mr-6">Weight</span>
          <span className="text-xs ml-2">Target</span>
        </div>
        <Steps
          onChange={onChange}
          direction="vertical"
          items={items}
          current={currentSet}
        />
        {showWarning && (
          <Alert
            showIcon
            type="error"
            message={
              "You haven't finished submitted all the reps for each the sets"
            }
          />
        )}
      </div>
    </Modal>
  );
}

type RowProps = {
  info: PersonalBest;
  step: number;
  target: number;
  intensity: number;
  disabled: boolean;
  warningEnabled: boolean;
  onContinue: () => void;
};
function Row({
  info,
  step,
  target,
  intensity,
  disabled,
  warningEnabled,
  onContinue,
}: RowProps) {
  const [reps, setReps] = useState<number>();
  const { getCachedLogInfo, cacheLogInfo } = useLocalStorage();
  const cachedInfo = getCachedLogInfo(info.exercise.exerciseId)?.info.find(
    (i) => i.set === step + 1
  );
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  useEffect(() => {
    setReps(cachedInfo?.reps);
  }, [info]);

  const weight = (intensity * 0.9 * info.pb).toFixed(0);

  const onNext = () => {
    const currentReps = reps ? !reps : !cachedInfo?.reps;
    if (currentReps) {
      setNoRepsWarning(true);
      return;
    }

    setNoRepsWarning(false);

    // +1 for the set
    cacheLogInfo(info.exercise.exerciseId, {
      info: {
        set: step + 1,
        reps: reps || 0,
        weight: parseInt(weight) || 0,
      },
    });
    onContinue();
  };

  const showWarning =
    noRepsWarning || (warningEnabled && (reps ? !reps : !cachedInfo?.reps));
  return (
    <div className="flex mb-4">
      <span className="mx-3 w-16 font-bold">{weight}</span>
      <span className="w-16 font-bold">{target}</span>
      <InputNumber
        className="mr-4"
        disabled={disabled}
        inputMode="decimal"
        value={reps}
        defaultValue={cachedInfo?.reps}
        min={0}
        onChange={(reps) => setReps(reps ?? 0)}
        prefix="reps"
      />
      <Button
        type="link"
        disabled={disabled}
        className="p-0 m-0"
        icon={<CheckCircleOutlined className="p-0 m-0" />}
        onClick={onNext}
      />
      {showWarning && (
        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
          <Tooltip trigger={"click"} title="Reps is missing!">
            <WarningOutlined className="text-orange-400" />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
