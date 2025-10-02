"use client";

import { Alert } from "antd";
import { resetWeeks } from "../actions";

export default function Info() {
  return (
    <Alert
      className="mt-4"
      type="info"
      message={
        <div>
          <span className="font-bold">531 program</span> runs in{" "}
          <span className="font-bold">4 week </span>
          blocks, so it is important to progress through each week and not to
          skip to any in order for this program to be effective. We take{" "}
          <span className="font-bold">90% </span>
          of your total personal best and use that as the base for the program.{" "}
          <span className="font-bold">
            You can reset the your progress{" "}
            <span onClick={resetWeeks} className="text-blue-500 cursor-pointer">
              here
            </span>
          </span>
        </div>
      }
    />
  );
}
