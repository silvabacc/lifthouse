"use client";

import { useLocalStorage } from "../../../../../hooks/useLocalStorage";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { App, Button, Modal } from "antd";
import { Dispatch, SetStateAction, useState, useTransition } from "react";
import { Complete } from "../compete";
import { saveLogs } from "../../actions";

type RecordEntryProps = {
  exercise: Exercise;
  setLogs: Dispatch<SetStateAction<LogEntry[]>>;
};

export function RecordEntry({ exercise, setLogs }: RecordEntryProps) {
  const { clearCacheLogInfo, getCachedLogInfo } = useLocalStorage();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { notification } = App.useApp();

  const onFinish = () => {
    const cached = getCachedLogInfo(exercise.exerciseId);
    const log: LogEntry = {
      exerciseId: exercise.exerciseId,
      info: cached?.info ?? [],
      notes: cached?.notes,
      date: new Date(),
    } as LogEntry;

    startTransition(async () => {
      try {
        const saved = await saveLogs([log]);
        setLogs((prev) => [...prev, ...saved]);
        setModalOpen(false);
        clearCacheLogInfo([exercise.exerciseId]);
      } catch {
        notification.error({ message: "Error saving log" });
      }
    });
  };

  return (
    <>
      {isModalOpen && (
        <Modal
          title="Record an entry"
          open={isModalOpen}
          onOk={onFinish}
          okText={isPending ? "Saving..." : "Finish"}
          confirmLoading={isPending}
          onCancel={() => setModalOpen(false)}
        >
          <Complete exercise={exercise} />
        </Modal>
      )}
      <Button type="dashed" danger onClick={() => setModalOpen(true)}>
        Record an entry
      </Button>
    </>
  );
}
