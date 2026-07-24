"use client";

import dayjs from "dayjs";
import dynamic from "next/dynamic";

const WeightChangeChart = dynamic(
  () => import("../lifthouse/weight/components/weightChangeChart"),
  { ssr: false },
);

import { WeightContext } from "../lifthouse/weight/context";

const base = dayjs().startOf("month").add(1, "day");
const rawWeights = [82.4, 82.1, 82.6, 82.0, 81.8, 81.9, 81.5, 81.7, 81.3, 81.6, 81.0, 81.2];
const weightData = rawWeights.map((weight, i) => ({
  id: i,
  weight,
  date: base.add(i, "day"),
}));

export default function ScratchVerifyPage() {
  return (
    <div style={{ padding: 24, maxWidth: 900 }}>
      <div
        style={{ height: 600, border: "1px solid #ccc" }}
        className="flex flex-col gap-4"
      >
        <div style={{ height: 350, background: "#f0f0f0", flexShrink: 0 }}>
          fake WeightLine (350px)
        </div>
        <div className="min-h-[180px] flex-1" style={{ border: "1px dashed red" }}>
          <WeightContext.Provider
            value={{
              selectedValue: dayjs(),
              setSelectedValue: () => {},
              monthSelected: dayjs().month(),
              setMonthSelected: () => {},
              yearSelected: dayjs().year(),
              setYearSelected: () => {},
              weightData,
              setWeightData: () => {},
              isLoading: false,
              setLoading: () => {},
            }}
          >
            <WeightChangeChart />
          </WeightContext.Provider>
        </div>
      </div>
    </div>
  );
}
