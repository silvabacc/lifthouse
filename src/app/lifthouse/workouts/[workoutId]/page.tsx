"use client";

import { Button, Radio, Space } from "antd";
import { PageInfoPortal } from "../../components/pageInfo";
import { useEffect } from "react";
import AddButton from "../components/addButton";

export default function WorkoutPlanPage({
  params,
}: {
  params: { workoutId: number };
}) {
  const onAddExerciseClick = () => {};

  return (
    <div>
      <PageInfoPortal>
        <WorkoutPageInfo />
      </PageInfoPortal>
      <AddButton title="+ Add Exercise" />
    </div>
  );
}

function WorkoutPageInfo() {
  return (
    <Space className="pt-4" direction="vertical">
      <h1 className="text-2xl font-bold">Workout templates</h1>
      <p className="text-gray-500 pb-2">
        You can apply workout templates by clicking on the template buttons
        below. This will overwrite all of the exercises for this current workout
        plan, or you can stick with your custom workout plan
      </p>
      <Radio.Group defaultValue="4" buttonStyle="solid">
        <Radio.Button value="1">Upper/Lower 4x week</Radio.Button>
        <Radio.Button value="2">Push Pull Legs 5x week</Radio.Button>
        <Radio.Button value="3">Push Pull Legs 6x week</Radio.Button>
        <Radio.Button value="4">Custom</Radio.Button>
      </Radio.Group>
    </Space>
  );
}
