import { useFetch } from "@/app/hooks/useFetch";
import { LogEntry, WorkoutTemplate } from "@/lib/supabase/db/types";
import { Button, DatePicker, Divider, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { getButtonType } from "./utils";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import dayjs from "dayjs";
import StackedChart from "../../components/visuals/stacked";
import LineChart from "../../components/visuals/line";
import Table from "../../components/visuals/table";
import { useWorkoutIdContext } from "./context";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { View } from "../../types";
import { useWorkout } from "../hooks/useWorkout";
import DeleteExerciseButton from "./components/deleteExerciseButton";

const { RangePicker } = DatePicker;
const { Text } = Typography;

const DEFAULT_LIMIT = 60;

export default function Charts() {
  const { workout, exercises } = useWorkoutIdContext();
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const { fetch } = useFetch();
  const [firstDate, setFirstDate] = useState(
    dayjs().subtract(DEFAULT_LIMIT, "day")
  );
  const [secondDate, setSecondDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);

  const { getCachedView, cacheView } = useLocalStorage();
  const cachedView = getCachedView();
  const [view, setView] = useState<View>(cachedView || View.stacked);

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

  const onClickView = (view: View) => {
    cacheView(view);
    setView(view);
  };

  const isCustomWorkout = workout.template === WorkoutTemplate.custom;

  return (
    <BottomFadeInAnimation className="flex flex-col h-full w-full">
      <div className={`overflow-y-auto ${loading && "opacity-50"}`}>
        {workout.exercises.map((exercise, index) => {
          const exerciseInfo = exercises.find(
            (e) => e.exerciseId === exercise.exerciseId
          );
          const data = logs.filter((l) => l.exerciseId === exercise.exerciseId);
          return (
            <div key={`${exercise.exerciseId}-${index}`}>
              <div className="flex flex-wrap">
                <div className="flex flex-wrap justify-between items-start z-10 bg-white w-full pb-2">
                  <div>
                    <h1 className="text-lg font-medium">
                      {exerciseInfo?.name}
                    </h1>
                    <Text className="text-base" keyboard>
                      {exercise.sets} x {exercise.reps}
                    </Text>
                  </div>
                  <div className="flex flex-wrap h-8">
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
                    <div className="flex items-center">
                      <RangePicker
                        className="my-2"
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
                      {isCustomWorkout && (
                        <DeleteExerciseButton
                          exerciseId={exercise.exerciseId}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  {view === View.stacked && <StackedChart data={data} />}
                  {view === View.line && <LineChart data={data} />}
                  {view === View.table && <Table data={data} />}
                </div>
                <Divider />
              </div>
            </div>
          );
        })}
      </div>
    </BottomFadeInAnimation>
  );
}
