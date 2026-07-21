"use client";

import { App, Button, Drawer } from "antd";
import { EditOutlined, UndoOutlined } from "@ant-design/icons";
import { useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { Setup } from "./components/setup";
import Weeks from "./weeks";
import { useFiveThreeOneContext } from "./context";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export default function FiveThreeOne() {
  const { clearFiveThreeOne } = useLocalStorage();
  const { fiveThreeOneInfo, setWeek, setCompleted } = useFiveThreeOneContext();
  const [setupOpen, setSetupOpen] = useState(false);
  const { modal } = App.useApp();

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  if (!bench.pb || !squat.pb || !deadlift.pb || !ohp.pb) {
    return (
      <div className="rounded-xl bg-white p-6">
        <h1 className="m-0 text-2xl font-bold">Welcome to the 531 program</h1>
        <p className="mt-2 max-w-2xl text-base text-gray-500">
          Enter your one-rep maxes below to get started. The program runs in
          4-week blocks based on 90% of your personal bests.
        </p>
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </div>
    );
  }

  const resetWeeks = () => {
    modal.confirm({
      title: "Reset your 531 progress?",
      content:
        "This takes you back to week 1 and clears completed lifts. Your personal bests are kept.",
      okText: "Reset",
      okButtonProps: { danger: true },
      cancelText: "Cancel",
      centered: true,
      onOk() {
        clearFiveThreeOne();
        setWeek(1);
        setCompleted([]);
      },
    });
  };

  return (
    <div>
      <PageInfoPortal
        extra={
          <div className="flex flex-wrap gap-2 pb-2">
            <Button icon={<EditOutlined />} onClick={() => setSetupOpen(true)}>
              Edit personal bests
            </Button>
            <Button
              icon={<UndoOutlined />}
              danger
              type="text"
              onClick={resetWeeks}
            >
              Reset progress
            </Button>
          </div>
        }
      />
      <Drawer
        size="min(880px, 100vw)"
        open={setupOpen}
        onClose={() => setSetupOpen(false)}
        title="Personal bests"
      >
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </Drawer>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[bench, squat, deadlift, ohp].map((lift) => (
          <div
            key={lift?.exercise?.name}
            className="rounded-xl border border-solid border-gray-100 bg-white p-4"
          >
            <p className="m-0 truncate text-sm font-medium text-gray-500">
              {lift?.exercise?.name}
            </p>
            <p className="m-0 mt-1 text-xl font-bold text-indigo-600">
              {lift?.pb} kg
            </p>
            <p className="m-0 text-xs text-gray-400">
              Training max {((lift?.pb || 0) * 0.9).toFixed(0)} kg
            </p>
          </div>
        ))}
      </div>
      <p className="mt-4 w-full rounded-xl bg-gray-50 p-4 text-sm text-gray-500">
        The 531 program runs in 4-week blocks — progress through each week in
        order without skipping for it to be effective. All working weights are
        based on 90% of your personal bests (your training max).
      </p>
      <Weeks />
    </div>
  );
}
