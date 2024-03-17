import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Button, DatePicker, Drawer } from "antd";
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
  const { getCachedView, cacheView } = useLocalStorage();

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

  return (
    <Drawer width={"100%"} open={show} onClose={onClose}>
      <div className={`overflow-y-auto ${loading && "opacity-50"}`}>
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
