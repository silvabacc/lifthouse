"use client";

import { Alert } from "antd";
import { Setup } from "./setup";
import { useFiveThreeOneContext } from "../context";

export default function Introduction() {
  const { fiveThreeOneInfo, loading } = useFiveThreeOneContext();

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  if (!loading && (!bench.pb || !squat.pb || !deadlift.pb || !ohp.pb)) {
    return (
      <div>
        <h1 className="text-2xl">Welcome to the 531 program</h1>
        <Alert
          className="mb-4"
          showIcon
          message="You need to setup your personal bests before you can start using this
          program"
        />
        <Setup />
      </div>
    );
  }
}
