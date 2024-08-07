import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, Modal, notification } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Complete } from "../compete";

type RecordEntryProps = {
  exercise: Exercise;
  setLogs: Dispatch<SetStateAction<LogEntry[]>>;
};
export function RecordEntry({ exercise, setLogs }: RecordEntryProps) {
  const { fetch } = useFetch();
  const { clearCacheLogInfo, getCachedLogInfo } = useLocalStorage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [notificationApi, notificationContextHolder] =
    notification.useNotification();
  const [saving, setSaving] = useState(false);

  const onClick = () => {
    setModalOpen(true);
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

    const response = await fetch("/api/logs/create", {
      method: "POST",
      body: JSON.stringify(exerciseLog),
    });

    if (response.error) {
      notificationApi.error({
        message: "Error saving log",
        description: response.error,
      });
      setSaving(false);
      return;
    }

    setLogs((prev) => [...prev, ...response]);

    setSaving(false);
    setModalOpen(false);
    clearCacheLogInfo([exercise.exerciseId]);
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          title="Record an entry"
          open={isModalOpen}
          onOk={onFinish}
          okText={saving ? "Saving..." : "Finish"}
          onCancel={() => setModalOpen(false)}
        >
          <Complete exercise={exercise} />
        </Modal>
      )}

      {notificationContextHolder}
      <Button type="dashed" danger onClick={onClick}>
        Record an entry
      </Button>
    </>
  );
}
