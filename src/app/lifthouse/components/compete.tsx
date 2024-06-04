import {
  LogInfo,
  ExerciseConfiguration,
  Exercise,
} from "@/lib/supabase/db/types";
import {
  Button,
  Input,
  InputNumber,
  Space,
  StepProps,
  Steps,
  Tooltip,
} from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  PlusSquareOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";

const { TextArea } = Input;

type Props = {
  exercise: Exercise;
};
export function Complete({ exercise }: Props) {
  const { getCachedLogInfo, cacheLogInfo, clearCacheLogInfo } =
    useLocalStorage();
  const cachedLogInfo = getCachedLogInfo(exercise.exerciseId);
  const latestLogInfo = cachedLogInfo?.info;
  const highestSet = getHighestSet(latestLogInfo || []);
  const [currentSet, setCurrentSet] = useState((highestSet || 1) - 1);
  const [info, setInfo] = useState<LogInfo[]>(
    latestLogInfo || [{ set: 1, reps: 0, weight: 0 }]
  );

  const onChange = (current: number) => {
    if (current < currentSet) {
      setCurrentSet(current);
    }
  };

  const onDelete = (set: number) => {
    const newInfo = info
      .filter((i) => i.set !== set)
      .map((info) => {
        if (info.set > set) {
          return { ...info, set: info.set - 1 };
        }
        return info;
      });
    setInfo(newInfo);
    clearCacheLogInfo([exercise.exerciseId]);
    newInfo.forEach((info) => {
      cacheLogInfo(exercise.exerciseId, {
        info: { set: info.set, reps: info.reps, weight: info.weight },
      });
    });
  };

  const items: StepProps[] = [];
  for (let i = 0; i < info.length; i++) {
    const latestLog = latestLogInfo?.find((l) => l.set === i + 1);

    items.push({
      title: `Set ${i + 1}`,
      description: (
        <StepRow
          exerciseId={exercise.exerciseId}
          step={i}
          placeHolder={{
            reps: latestLog?.reps.toString(),
            weight: latestLog?.weight.toString(),
          }}
          info={info[i]}
          disabled={currentSet !== i}
          warningEnabled={currentSet > i}
          setInfo={setInfo}
          onContinue={() => setCurrentSet(currentSet + 1)}
          onDelete={() => onDelete(i + 1)}
        />
      ),
    });
  }

  const addSet = () => {
    //Incase there is no first set recoreded when adding set
    if (info.length === 1 && !latestLogInfo?.find((log) => log.set === 1)) {
      cacheLogInfo(exercise.exerciseId, {
        info: { set: 1, reps: 0, weight: 0 },
      });
    }
    const newSet = info.length + 1;
    setInfo((prev) => [...prev, { set: newSet, reps: 0, weight: 0 }]);

    cacheLogInfo(exercise.exerciseId, {
      info: { set: newSet, reps: 0, weight: 0 },
    });
  };

  const onChangeNoes = (value: string, exerciseId: number) => {
    cacheLogInfo(exerciseId, { notes: value });
  };

  return (
    <div style={{ minWidth: 260 }} className="flex h-full flex-col mt-4">
      <Steps
        onChange={onChange}
        direction="vertical"
        items={items}
        size="small"
        current={currentSet}
      />
      <div className="flex justify-center">
        <Button type="link" icon={<PlusSquareOutlined />} onClick={addSet} />
      </div>
      <h3 className="m-0">Notes</h3>
      <TextArea
        autoSize={true}
        defaultValue={cachedLogInfo?.notes}
        placeholder={cachedLogInfo?.notes}
        className="mt-4"
        onChange={(e) => onChangeNoes(e.target.value, exercise.exerciseId)}
      />
    </div>
  );
}

type StepRowProps = {
  exerciseId: number;
  step: number;
  disabled: boolean;
  warningEnabled: boolean; //Warnings can only appear if the current set is less than the rendered set
  placeHolder?: { reps?: string; weight?: string };
  info: LogInfo;
  setInfo: Dispatch<SetStateAction<LogInfo[]>>;
  onContinue: () => void;
  onDelete: () => void;
};
function StepRow({
  exerciseId,
  step,
  disabled,
  warningEnabled,
  placeHolder,
  info,
  setInfo,
  onContinue,
  onDelete,
}: StepRowProps) {
  const [weight, setWeight] = useState<number>();
  const [reps, setReps] = useState<number>();
  const { getCachedLogInfo, cacheLogInfo } = useLocalStorage();
  const cachedInfo = getCachedLogInfo(exerciseId)?.info.find(
    (i) => i.set === step + 1
  );
  const [noRepsWarning, setNoRepsWarning] = useState(false);

  useEffect(() => {
    setWeight(info.weight);
    setReps(info.reps);
  }, [info]);

  const onNext = () => {
    const currentReps = reps ? !reps : !cachedInfo?.reps;
    if (currentReps) {
      setNoRepsWarning(true);
      return;
    }

    setNoRepsWarning(false);

    setInfo((prev) => {
      const newInfo = prev.map((info) => {
        if (info.set === step + 1) {
          return { set: step + 1, reps: reps || 0, weight: weight || 0 };
        }
        return info;
      });
      return newInfo;
    });

    // +1 for the set
    cacheLogInfo(exerciseId, {
      info: {
        set: step + 1,
        reps: reps || 0,
        weight: weight || 0,
      },
    });
    onContinue();
  };

  const showWarning =
    noRepsWarning || (warningEnabled && (reps ? !reps : !cachedInfo?.reps));

  return (
    <div className="flex w-full justify-between">
      <Space>
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          placeholder={placeHolder?.weight}
          value={weight}
          onChange={(weight) => setWeight(weight ?? 0)}
          defaultValue={cachedInfo?.weight}
          min={0}
          prefix="kg"
        />
        <InputNumber
          disabled={disabled}
          inputMode="decimal"
          value={reps}
          placeholder={placeHolder?.reps}
          defaultValue={cachedInfo?.reps}
          min={0}
          onChange={(reps) => setReps(reps ?? 0)}
          prefix="reps"
        />
      </Space>
      <div className="flex flex-wrap flex-row justify-center">
        <Button
          type="link"
          disabled={disabled}
          className="p-0 m-0"
          icon={<CheckCircleOutlined className="p-0 m-0" />}
          onClick={onNext}
        />
        <Button
          danger
          type="link"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.preventDefault();
            onDelete();
          }}
        />
        {showWarning && (
          <div onClick={(e) => e.stopPropagation()}>
            <Tooltip trigger={"click"} title="Reps is missing!">
              <Button
                type="link"
                className="p-0 m-0 text-orange-400"
                icon={<WarningOutlined className="" />}
              />
            </Tooltip>
          </div>
        )}
      </div>
    </div>
  );
}

function getHighestSet(info: LogInfo[]) {
  return info.reduce((acc, curr) => (curr.set > acc ? curr.set : acc), 0);
}
