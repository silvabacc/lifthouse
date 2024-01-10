import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry } from "@/lib/supabase/db/types";
import { Button, DatePicker, Divider, Space } from "antd";
import { useEffect, useState } from "react";
import { getButtonType } from "./utils";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import ChartsSkeleton from "./charts.skeleton";
import dayjs from "dayjs";
import StackedChart from "./components/visuals/stacked";
import LineChart from "./components/visuals/line";
import Table from "./components/visuals/table";
import { SelectExercise, SelectRepsScheme } from "./components/selectors";
import { useWorkoutIdContext } from "./context";

const { RangePicker } = DatePicker;

export enum View {
  line = "line",
  stacked = "stacked",
  table = "table",
}

export default function Charts() {
  const { exercises, workout, setWorkout } = useWorkoutIdContext();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { fetch } = useFetch();
  const [firstDate, setFirstDate] = useState(dayjs().subtract(30, "day"));
  const [secondDate, setSecondDate] = useState(dayjs());
  const [view, setView] = useState<View>(View.stacked);
  const [loading, setLoading] = useState(false);

  const fetchLogs = async () => {
    if (loading) return;

    setLoading(true);
    const response: LogEntry[] = await fetch(`/api/logs`, {
      method: "POST",
      body: JSON.stringify({
        exerciseIds: workout.exercises.map((e) => e.exerciseId),
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
  }, [firstDate, secondDate, workout]);

  if (loading) {
    return <ChartsSkeleton />;
  }

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full">
      {workout.exercises.map((exercise, index) => {
        const data = logs.filter((l) => l.exerciseId === exercise.exerciseId);
        return (
          <div key={`${exercise.exerciseId}-${index}`}>
            <div className="flex flex-wrap justify-between">
              <Space className="flex-wrap">
                <SelectExercise defaultExercise={exercise} />
                <SelectRepsScheme defaultExercise={exercise} />
              </Space>
              <div>
                <Button
                  className="p-0"
                  type={getButtonType(view, View.stacked)}
                  onClick={() => setView(View.stacked)}
                >
                  Stacked
                </Button>
                <Divider type="vertical" />
                <Button
                  className="p-0"
                  type={getButtonType(view, View.line)}
                  onClick={() => setView(View.line)}
                >
                  Line
                </Button>
                <Divider type="vertical" />
                <Button
                  className="p-0"
                  type={getButtonType(view, View.table)}
                  onClick={() => setView(View.table)}
                >
                  Table
                </Button>
                <Divider type="vertical" />
                <RangePicker
                  format={(value) => value.format("DD/MM/YYYY")}
                  onChange={(dates) => {
                    if (dates?.[0] && dates[0] !== firstDate) {
                      setFirstDate(dates?.[0]);
                    }
                    if (dates?.[1] && dates[1] !== secondDate) {
                      setSecondDate(dates?.[1]);
                    }
                  }}
                  placement="bottomLeft"
                  defaultValue={[secondDate, firstDate]}
                />
              </div>
              <div style={{ width: "100%" }}>
                {view === View.stacked && <StackedChart data={data} />}
                {view === View.line && <LineChart data={data} />}
                {view === View.table && <Table data={data} />}
              </div>
              <Divider />
            </div>
          </div>
        );
      })}
    </BottomFadeInAnimation>
  );
}
