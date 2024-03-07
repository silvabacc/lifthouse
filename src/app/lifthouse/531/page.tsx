"use client";

import { Button, Card, Skeleton } from "antd";
import { useEffect, useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { SetupDrawer } from "./components/setup";
import { useFetch } from "@/app/hooks/useFetch";
import { FiveThreeOne } from "@/lib/supabase/db/types";

export default function FiveThreeOnePage() {
  const { fetch } = useFetch();
  const [benchPB, setBenchPB] = useState(0);
  const [squatPB, setSquatPB] = useState(0);
  const [deadliftPB, setDeadliftDB] = useState(0);
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
    };
    fetchData();
  }, []);

  return (
    <>
      <PageInfoPortal
        extra={
          <span>
            <Button onClick={() => setSetupOpen(true)}>
              Set your personal best for SBD
            </Button>
          </span>
        }
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
        <SetupDrawer
          pbs={{
            bench: { weight: benchPB, setter: setBenchPB },
            squat: { weight: squatPB, setter: setSquatPB },
            deadlift: { weight: deadliftPB, setter: setDeadliftDB },
          }}
          open={setupOpen}
          onClose={() => setSetupOpen(false)}
        />
      </div>
    </>
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
        <span className="font-bold text-cyan-600">{value} kg</span>
      )}
    </div>
  );
}
