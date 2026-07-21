"use client";

import WeightCalendar from "./components/weightCalendar";
import WeightAlert from "./components/weightAlert";
import WeightStats from "./components/weightStats";
import { PageInfoPortal } from "../components/pageInfo";
import dynamic from "next/dynamic";

const WeightLine = dynamic(() => import("./components/weightLine"), {
  ssr: false,
});

export default function WeightPage() {
  return (
    <div className="rounded-xl bg-white p-4">
      <PageInfoPortal extra={<WeightAlert />} />
      <WeightStats />
      <div className="flex flex-col gap-4 xl:flex-row">
        <div className="min-w-0 flex-1">
          <WeightLine />
        </div>
        <div className="shrink-0 xl:w-[380px]">
          <WeightCalendar />
        </div>
      </div>
    </div>
  );
}
