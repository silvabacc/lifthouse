import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Exercise, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import {
  Button,
  Drawer,
  InputNumber,
  Space,
  StepProps,
  Steps,
  Tooltip,
} from "antd";
import { useState } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  selectedExercise: PersonalBest;
  sets: number;
  reps: number[];
  intensity: number[];
};
export default function CompleteFiveThreeOneDrawer({
  open,
  onClose,
  selectedExercise,
  sets,
  reps,
  intensity,
}: Props) {
  const { getCachedLogInfo } = useLocalStorage();
  const highestSet = getCachedLogInfo(
    selectedExercise.exercise.exerciseId
  )?.info.reduce((acc, curr) => (curr.set > acc ? curr.set : acc), 0);
  const [currentSet, setCurrentSet] = useState(highestSet || 0);

  console.log(sets, reps, intensity);

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

  return (
    <Drawer open={open} onClose={onClose}>
      <div className="flex h-full flex-col">
        <div className="flex">
          <span>Set</span>
          <span>Weight</span>
          <span>Target</span>
        </div>
        <Steps
          onChange={(current) => setCurrentSet(current)}
          direction="vertical"
          items={items}
          size="small"
          current={currentSet}
        />
      </div>
    </Drawer>
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

  const onNext = () => {
    // +1 for the set
    // cacheLogInfo(exerciseId, {
    //   info: {
    //     set: step + 1,
    //     reps: reps || 0,
    //     weight: weight || 0,
    //   },
    // });
    onContinue();
  };

  const showWarning = warningEnabled && (reps ? !reps : !cachedInfo?.reps);

  return (
    <Space>
      <span>Intensity: {intensity * info.pb}</span>
      <span>Target: {target}</span>

      <InputNumber
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
        <div onClick={(e) => e.stopPropagation()}>
          <Tooltip trigger={"click"} title="Reps is missing!">
            <WarningOutlined className="text-orange-400" />
          </Tooltip>
        </div>
      )}
    </Space>
  );
}
