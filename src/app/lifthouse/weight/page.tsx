"use client";

import WeightCalendar from "./components/weightCalendar";
import WeightAlert from "./components/weightAlert";
import WeightStats from "./components/weightStats";
import dynamic from "next/dynamic";

const WeightLine = dynamic(() => import("./components/weightLine"), {
  ssr: false,
});
const WeightChangeChart = dynamic(
  () => import("./components/weightChangeChart"),
  { ssr: false },
);

export default function WeightPage() {
  return (
    <div className="rounded-xl bg-white p-4">
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-4">
          <WeightAlert />
          <WeightStats />
          <WeightLine />
          <div className="min-h-0 flex-1">
            <WeightChangeChart />
          </div>
        </div>
        <div className="shrink-0 xl:w-[380px]">
          <WeightCalendar />
        </div>
      </div>
    </div>
  );
}
