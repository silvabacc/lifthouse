import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, Divider, Select, Skeleton, Space } from "antd";
import { getButtonType } from "../../utils";
import { useState } from "react";
import { View } from "../../types";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import StackedChart from "../../components/logVisuals/stacked";
import LineChart from "../../components/logVisuals/line";
import Table from "../../components/logVisuals/table";

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
        <div>
          {view === View.stacked && <StackedChart data={logs} />}
          {view === View.line && <LineChart data={logs} />}
          {view === View.table && <Table data={logs} setLogs={setLogs} />}
        </div>
      </div>
    </div>
  );
}
