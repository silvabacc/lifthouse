"use client";

import { Alert, Button, Card, Drawer } from "antd";
import { useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { Setup } from "./components/setup";
import Weeks from "./weeks";
import { useFiveThreeOneContext } from "./context";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";

export default function FiveThreeOne() {
  const { clearFiveThreeOne } = useLocalStorage();
  const { fiveThreeOneInfo, setWeek, setCompleted } = useFiveThreeOneContext();
  const [setupOpen, setSetupOpen] = useState(false);

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  if (!bench.pb || !squat.pb || !deadlift.pb || !ohp.pb) {
    return (
      <div>
        <h1 className="text-2xl">Welcome to the 531 program</h1>
        <Alert
          className="mb-4"
          showIcon
          title="You need to setup your personal bests before you can start using this program"
        />
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </div>
    );
  }

  const resetWeeks = () => {
    clearFiveThreeOne();
    setWeek(1);
    setCompleted([]);
  };

  return (
    <div>
      <PageInfoPortal
        extra={
          <span>
            <Button onClick={() => setSetupOpen(true)}>Edit SBD personal bests</Button>
          </span>
        }
      />
      <Drawer size="large" open={setupOpen} onClose={() => setSetupOpen(false)}>
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </Drawer>
      <div className="grid lg:grid-cols-4 gap-4">
        {[bench, squat, deadlift, ohp].map((lift) => (
          <Card key={lift?.exercise?.name}>
            <div className="flex justify-between">
              <h2 className="p-0 m-0">{lift?.exercise?.name}</h2>
              <div className="flex flex-col ml-4 whitespace-nowrap">
                <span className="font-bold text-blue-500 text-lg">{lift?.pb} kg</span>
                <span className="text-right text-xs text-neutral-500">
                  90% {((lift?.pb || 0) * 0.9).toFixed(0)} kg
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Alert
        className="mt-4"
        type="info"
        title={
          <div>
            <span className="font-bold">531 program</span> runs in{" "}
            <span className="font-bold">4 week </span>
            blocks, so it is important to progress through each week and not to skip to any in
            order for this program to be effective. We take{" "}
            <span className="font-bold">90% </span>
            of your total personal best and use that as the base for the program.{" "}
            <span className="font-bold">
              You can reset your progress{" "}
              <span onClick={resetWeeks} className="text-blue-500 cursor-pointer">
                here
              </span>
            </span>
          </div>
        }
      />
      <Weeks />
    </div>
  );
}
