import { useEffect, useState } from "react";
import { View } from "./types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Button, DatePicker, Divider, Space } from "antd";
import dayjs from "dayjs";
import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import dynamic from "next/dynamic";
import ChartsSkeleton from "./charts.skeleton";
import { RecordEntry } from "./recordEntry";

const DEFAULT_LIMIT = 60;

const { RangePicker } = DatePicker;

const StackedChart = dynamic(() => import("./stacked"));
const LineChart = dynamic(() => import("./line"));
const Table = dynamic(() => import("./table"));

type LogVisualProps = {
  exercise: Exercise;
  showExerciseName?: boolean;
  allowNewEntry?: boolean;
};
export function LogVisual({
  exercise,
  showExerciseName,
  allowNewEntry,
}: LogVisualProps) {
  const [loading, setLoading] = useState(false);
  const { getCachedView, cacheView } = useLocalStorage();
  const { fetchLogs } = useFetch();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [view, setView] = useState<View>(View.stacked);
  const [firstDate, setFirstDate] = useState(
    dayjs().subtract(DEFAULT_LIMIT, "day")
  );
  const [secondDate, setSecondDate] = useState(dayjs());

  useEffect(() => {
    const view = getCachedView();
    if (view) {
      setView(view);
    }
  }, []);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      if (secondDate > firstDate) {
        const response = await fetchLogs([exercise.exerciseId], {
          startFrom: firstDate,
          endOn: secondDate,
        });
        setLogs(response);
      }
      setLoading(false);
    };
    fetch();
  }, [firstDate, secondDate, exercise]);

  const onClickView = (view: View) => {
    cacheView(view);
    setView(view);
  };

  if (loading) {
    return <ChartsSkeleton />;
  }

  return (
    <>
      <div className="flex justify-between pb-2">
        {showExerciseName && <h1 className="m-0 p-0">{exercise.name}</h1>}
        {allowNewEntry && (
          <div className="flex justify-end">
            <RecordEntry exercise={exercise} setLogs={setLogs} />
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-between">
        <Space>
          {Object.values(View).map((v, idx) => (
            <div key={`${v}-${idx}`}>
              <Button
                key={v}
                className="p-0"
                type={getButtonType(view, v)}
                onClick={() => onClickView(v)}
              >
                {v.charAt(0).toUpperCase() + v.slice(1)}
              </Button>
              <Divider type="vertical" />
            </div>
          ))}
        </Space>
        <RangePicker
          inputReadOnly
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
      <div className="pb-4">
        {view === View.stacked && <StackedChart data={logs} />}
        {view === View.line && <LineChart data={logs} />}
        {view === View.table && <Table data={logs} setLogs={setLogs} />}
      </div>
    </>
  );
}

function getButtonType(currentView: View, targetView: View) {
  return currentView === targetView ? "link" : "text";
}
