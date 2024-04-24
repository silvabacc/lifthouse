import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, DatePicker, Drawer, Modal } from "antd";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { View } from "../types";
import {
  BarChartOutlined,
  LineChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import dynamic from "next/dynamic";
import { Complete } from "../components/compete";

const StackedChart = dynamic(() => import("../components/logVisuals/stacked"));
const LineChart = dynamic(() => import("../components/logVisuals/line"));
const Table = dynamic(() => import("../components/logVisuals/table"));

const DEFAULT_LIMIT = 60;

const { RangePicker } = DatePicker;

type Props = {
  exercise?: Exercise;
  show: boolean;
  onClose: () => void;
};
export default function ExerciseDrawer({ exercise, show, onClose }: Props) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { fetch } = useFetch();
  const { getCachedView, cacheView, clearCacheLogInfo, getCachedLogInfo } =
    useLocalStorage();
  const [modal, contextHolder] = Modal.useModal();
  const [saving, setSaving] = useState(false);

  const [firstDate, setFirstDate] = useState(
    dayjs().subtract(DEFAULT_LIMIT, "day")
  );
  const [secondDate, setSecondDate] = useState(dayjs());

  const [loading, setLoading] = useState(false);
  const cachedView = getCachedView();
  const [view, setView] = useState<View>(cachedView || View.stacked);

  const fetchLogs = async () => {
    if (loading || !exercise) return;

    setLoading(true);
    const response: LogEntry[] = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({
        exerciseIds: [exercise?.exerciseId],
        startFrom: firstDate,
        endOn: secondDate,
      }),
    });
    setLoading(false);
    setLogs(response);
  };

  useEffect(() => {
    if (secondDate > firstDate) {
      fetchLogs();
    }
  }, [firstDate, secondDate, exercise]);

  const onClickView = (view: View) => {
    cacheView(view);
    setView(view);
  };

  const onClickRecord = () => {
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
    <Drawer
      width={"100%"}
      open={show}
      onClose={onClose}
      extra={<RecordEntry onClick={onClickRecord} />}
    >
      <div className={`overflow-y-auto ${loading && "opacity-50"}`}>
        {contextHolder}
        <div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{exercise?.name}</h1>
            <div>
              <Button
                type="text"
                onClick={() => onClickView(View.stacked)}
                icon={<BarChartOutlined />}
              />
              <Button
                type="text"
                onClick={() => onClickView(View.line)}
                icon={<LineChartOutlined />}
              />
              <Button
                type="text"
                onClick={() => onClickView(View.table)}
                icon={<TableOutlined />}
              />
            </div>
          </div>
          <RangePicker
            value={[firstDate, secondDate]}
            onChange={(dates) => {
              if (dates?.[0] && dates[0] !== firstDate) {
                setFirstDate(dates?.[0]);
              }
              if (dates?.[1] && dates[1] !== secondDate) {
                setSecondDate(dates?.[1]);
              }
            }}
          />
        </div>
        <div>
          <div className="w-full">
            {view === View.stacked && <StackedChart data={logs} />}
            {view === View.line && <LineChart data={logs} />}
            {view === View.table && <Table data={logs} />}
          </div>
        </div>
      </div>
    </Drawer>
  );
}

type RecordEntryProps = {
  onClick: () => void;
};
function RecordEntry({ onClick }: RecordEntryProps) {
  return (
    <Button type="dashed" danger onClick={onClick}>
      Record an entry
    </Button>
  );
}
