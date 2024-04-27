import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { LogEntry, PersonalBest } from "@/lib/supabase/db/types";
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Collapse,
  Divider,
  Drawer,
  Input,
  InputNumber,
  StepProps,
  Steps,
  Tooltip,
  notification,
} from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFiveThreeOneContext } from "../context";
import Warmup from "./warmup";
import { useFetch } from "@/app/hooks/useFetch";
import Progress531 from "./progress";
import { useFiveThreeOne } from "../useFiveThreeOne";
import { NotificationDescription, NotificationMessage } from "./notification";

const { TextArea } = Input;

type Props = {
  open: boolean;
  onClose: () => void;
  selectedExercise: PersonalBest;
  sets: number;
  reps: number[];
  intensity: number[];
  logs: LogEntry[];
  setLogs: Dispatch<SetStateAction<LogEntry[]>>;
  latestLog?: LogEntry;
};
export default function CompleteFiveThreeOneModal({
  open,
  onClose,
  selectedExercise,
  sets,
  reps,
  intensity,
  setLogs,
  latestLog,
  logs,
}: Props) {
  const {
    getCachedLogInfo,
    clearCacheLogInfo,
    cacheFiveThreeOneInfo,
    getCachedFiveThreeOneInfo,
    cacheLogInfo,
    clearFiveThreeOne,
  } = useLocalStorage();
  const { increasePersonalBests } = useFiveThreeOne();
  const [currentSet, setCurrentSet] = useState(0);
  const [showWarning, setShowWarning] = useState(false);
  const [saving, setSaving] = useState(false);
  const { setWeek, setCompleted, fiveThreeOneInfo } = useFiveThreeOneContext();
  const [notes, setNotes] = useState<string>();
  const { fetch } = useFetch();
  const [api, contextHolder] = notification.useNotification();
  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  const exercises = [bench, squat, deadlift, ohp];

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

  const onChangeNoes = (value: string) => {
    cacheLogInfo(selectedExercise.exercise.exerciseId, {
      notes: value,
    });
    setNotes(value);
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

    const response = await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify([logs]),
    });

    setLogs((logs) => [...logs, ...response]);

    if (cachedFiveThreeOneInfo?.completed.length === 3) {
      cacheFiveThreeOneInfo({
        week: cachedFiveThreeOneInfo?.week + 1,
        completed: [],
      });

      if (cachedFiveThreeOneInfo?.week === 4) {
        clearFiveThreeOne();
        setWeek(1);
        await increasePersonalBests();
        api.info({
          message: <NotificationMessage />,
          description: <NotificationDescription exercises={exercises} />,
        });
      } else {
        setWeek(cachedFiveThreeOneInfo?.week + 1);
      }

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
    setNotes("");

    onClose();
  };

  const latestReps = latestLog?.info?.at(-1)?.reps || 0;
  const improvement = (latestReps || 0) - reps[0];

  return (
    <Drawer
      width={"100%"}
      title={selectedExercise.exercise.name}
      open={open}
      onClose={() => {
        setShowWarning(false);
        onClose();
      }}
    >
      {contextHolder}
      <div className="flex flex-col">
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
        {latestLog && (
          <Alert
            showIcon
            type="info"
            message={
              <div>
                Last set you did{" "}
                <span className="font-bold">
                  {latestLog.info?.at(-1)?.weight} kg x {latestReps}
                </span>{" "}
                ({improvement <= 0 ? "" : "+"}
                {improvement})
              </div>
            }
          />
        )}
        <TextArea
          autoSize={true}
          value={notes}
          placeholder={latestLog?.notes || "Notes"}
          className="my-2"
          onChange={(e) => onChangeNoes(e.target.value)}
        />
        {showWarning && (
          <Alert
            className="mt-2"
            showIcon
            type="error"
            message={
              "You haven't finished submitted all the reps for each the sets"
            }
          />
        )}
      </div>
      <Collapse
        className="mt-2"
        items={[
          {
            label: "Warmup",
            children: <Warmup selectedExercise={selectedExercise} />,
          },
        ]}
      />
      <Progress531
        exerciseId={selectedExercise.exercise.exerciseId}
        setLogs={setLogs}
        logs={logs}
      />
      <div className="fixed bottom-0 pb-2 bg-white w-full">
        <Divider className="m-0" />
        <div className="flex justify-end pr-12">
          <Button
            className="mt-2"
            type="primary"
            onClick={onOk}
            loading={saving}
          >
            {saving ? "Saving" : "Finish"}
          </Button>
        </div>
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
