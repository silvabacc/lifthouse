import React, { useState } from "react";
import { useWorkout } from "../useWorkout";
import { LogEntry } from "@backend/types";

interface HistoryProps {
  history?: LogEntry;
}

export const History: React.FC<HistoryProps> = ({ history }) => {
  console.log("history", history);

  return <div>History</div>;
};

export default History;
