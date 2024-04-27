import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, Divider, Select, Skeleton, Space } from "antd";
import { getButtonType } from "../../utils";
import { useState } from "react";
import { View } from "../../types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import dynamic from "next/dynamic";

const StackedChart = dynamic(
  () => import("../../components/logVisuals/stacked")
);
const LineChart = dynamic(() => import("../../components/logVisuals/line"));
const Table = dynamic(() => import("../../components/logVisuals/table"));

type Props = {
  exerciseId: number;
  logs: LogEntry[];
  setLogs: (logs: LogEntry[]) => void;
};
export default function Progress531({ logs, setLogs }: Props) {
  const { cacheView, getCachedView } = useLocalStorage();
  const [view, setView] = useState(getCachedView() || View.stacked);

  const onClickView = (view: View) => {
    cacheView(view);
    setView(view);
  };

  return (
    <div className="mb-4 w-full">
      <Divider />
      <h3>Progress</h3>
      <div>
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
        <div className="pb-4">
          {view === View.stacked && <StackedChart data={logs} />}
          {view === View.line && <LineChart data={logs} />}
          {view === View.table && <Table data={logs} setLogs={setLogs} />}
        </div>
      </div>
    </div>
  );
}
