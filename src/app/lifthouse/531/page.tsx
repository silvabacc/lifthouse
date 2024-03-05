"use client";

import { Button, Card } from "antd";
import { useState } from "react";
import { PageInfoPortal } from "../components/pageInfo";
import { SetupDrawer } from "./components/setup";

export default function FiveThreeOnePage() {
  const [benchPB, setBenchPB] = useState(0);
  const [squatPB, setSquatPB] = useState(0);
  const [deadliftPB, setDeadliftDB] = useState(0);
  const [setupOpen, setSetupOpen] = useState(false);

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
          <CardContent title="Bench" value={benchPB} />
        </Card>
        <Card>
          <CardContent title="Squat" value={squatPB} />
        </Card>
        <Card>
          <CardContent title="Deadlift" value={deadliftPB} />
        </Card>
        <SetupDrawer open={setupOpen} onClose={() => setSetupOpen(false)} />
      </div>
    </>
  );
}

type Props = {
  title: string;
  value: number;
};
function CardContent({ title, value }: Props) {
  return (
    <div className="flex items-center justify-between">
      <h2>{title}</h2>
      <span className="font-bold text-cyan-600">{value} kg</span>
    </div>
  );
}
