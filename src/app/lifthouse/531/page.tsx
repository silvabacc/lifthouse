"use client";

import { Alert, Button, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { SetupDrawer } from "./components/setup";
import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, FiveThreeOne } from "@/lib/supabase/db/types";
import FiveThreeOneWeeks from "./fiveThreeOneWeeks";

export default function FiveThreeOnePage() {
  const { fetch } = useFetch();
  const [benchPB, setBenchPB] = useState(0);
  const [squatPB, setSquatPB] = useState(0);
  const [deadliftPB, setDeadliftDB] = useState(0);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [setupOpen, setSetupOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: FiveThreeOne = await fetch("/api/531");
      setBenchPB(response.bench);
      setSquatPB(response.squat);
      setDeadliftDB(response.deadlift);
      setLoading(false);
      setExercises(response.exercises);
      setCurrentWeek(response.currentWeek);
    };
    fetchData();
  }, []);

  return (
    <div>
      <PageInfoPortal
        extra={
          <span>
            <Button onClick={() => setSetupOpen(true)}>
              Set your personal best for SBD
            </Button>
          </span>
        }
      />
      <SetupDrawer
        pbs={{
          bench: { weight: benchPB, setter: setBenchPB },
          squat: { weight: squatPB, setter: setSquatPB },
          deadlift: { weight: deadliftPB, setter: setDeadliftDB },
        }}
        open={setupOpen}
        onClose={() => setSetupOpen(false)}
      />
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardContent title="Bench" value={benchPB} isLoading={loading} />
        </Card>
        <Card>
          <CardContent title="Squat" value={squatPB} isLoading={loading} />
        </Card>
        <Card>
          <CardContent
            title="Deadlift"
            value={deadliftPB}
            isLoading={loading}
          />
        </Card>
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
      ></Alert>
      <FiveThreeOneWeeks exercises={exercises} currentWeek={currentWeek} />
    </div>
  );
}

type Props = {
  title: string;
  value: number;
  isLoading?: boolean;
};
function CardContent({ title, value, isLoading }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2>{title}</h2>
      {isLoading ? (
        <Skeleton.Button active />
      ) : (
        <span className="font-bold text-blue-500 text-lg">{value} kg</span>
      )}
    </div>
  );
}
