"use client";

import { Alert, Button, Card, Drawer, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { Setup } from "./components/setup";
import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, FiveThreeOne } from "@/lib/supabase/db/types";
import Weeks from "./weeks";
import { useFiveThreeOneContext } from "./context";

export default function FiveThreeOne() {
  const { fiveThreeOneInfo, loading } = useFiveThreeOneContext();
  const [setupOpen, setSetupOpen] = useState(false);

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  if (!loading && (!bench || !squat || !deadlift || !ohp)) {
    return (
      <div>
        <h1 className="text-2xl">Welcome to the 531 program</h1>
        <Alert
          className="mb-4"
          showIcon
          message="You need to setup your personal bests before you can start using this
          program"
        />
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </div>
    );
  }

  const exercises = [bench, squat, deadlift, ohp];

  return (
    <div>
      <PageInfoPortal
        extra={
          <span>
            <Button onClick={() => setSetupOpen(true)}>
              Edit SBD personal bests
            </Button>
          </span>
        }
      />
      <Drawer open={setupOpen} onClose={() => setSetupOpen(false)}>
        <Setup open={setupOpen} onClose={() => setSetupOpen(false)} />
      </Drawer>
      <div className="grid lg:grid-cols-4 gap-4">
        {exercises.map((lift) => (
          <Card key={lift?.exercise?.name}>
            <CardContent
              title={lift?.exercise?.name}
              value={lift?.pb}
              isLoading={loading}
            />
          </Card>
        ))}
      </div>
      <Alert
        className="mt-4"
        type="info"
        showIcon
        message={
          <div>
            <span className="font-bold">531 program</span> runs in{" "}
            <span className="font-bold">4 week </span>
            blocks, so it is important to progress through each week and not to
            skip to any in order for this program to be effective
          </div>
        }
      />
      <Weeks />
    </div>
  );
}

type Props = {
  title?: string;
  value?: number;
  isLoading?: boolean;
};
function CardContent({ title, value, isLoading }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2>{title}</h2>
      {isLoading ? (
        <Skeleton.Button active />
      ) : (
        <span className="ml-4 font-bold text-blue-500 text-lg whitespace-nowrap">
          {value} kg
        </span>
      )}
    </div>
  );
}
