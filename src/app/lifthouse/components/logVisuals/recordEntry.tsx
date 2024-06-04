import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, Modal } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Complete } from "../compete";

type RecordEntryProps = {
  exercise: Exercise;
  setLogs: Dispatch<SetStateAction<LogEntry[]>>;
};
export function RecordEntry({ exercise, setLogs }: RecordEntryProps) {
  const { fetch } = useFetch();
  const { clearCacheLogInfo, getCachedLogInfo } = useLocalStorage();
  const [modal, contextHolder] = Modal.useModal();
  const [saving, setSaving] = useState(false);

  const onClick = () => {
    console.log("click");
    modal.info({
      title: "Record an entry",
      icon: <></>,
      okText: `${saving ? "Saving" : "Finish"}`,
      onOk: onFinish,
      content: exercise ? <Complete exercise={exercise} /> : <></>,
    });
  };

  const onFinish = async () => {
    if (!exercise) return;

    const cached = getCachedLogInfo(exercise.exerciseId);

    const exerciseLog = [
      {
        exerciseId: exercise.exerciseId,
        info: cached?.info,
        notes: cached?.notes,
        date: new Date(),
      },
    ];

    setSaving(true);

    const response: LogEntry[] = await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify(exerciseLog),
    });

    setLogs((prev) => [...prev, ...response]);

    setSaving(false);
    clearCacheLogInfo([exercise.exerciseId]);
  };

  return (
    <>
      {contextHolder}
      <Button type="dashed" danger onClick={onClick}>
        Record an entry
      </Button>
    </>
  );
}
