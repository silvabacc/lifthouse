import React, { useState } from "react";
import { useWorkout } from "../useWorkout";
import { LogEntry } from "@backend/types";
import { useScreen } from "@frontend/hooks/useScreen";

/**
 * @param exerciseId - pass this to fetch data its own data
 * @param history - if you pass history, you will not need to fetch data
 *
 */

interface HistoryProps {
  page: number;
  onPageChange: (page: number) => void;
  exerciseId?: string;
  history?: LogEntry[];
}

export const History: React.FC<HistoryProps> = ({
  exerciseId,
  history,
  page,
}) => {
  const { getExerciseHistory } = useWorkout();
  const { isMobile } = useScreen();

  if (exerciseId) {
    const exerciseIds = exerciseId;
    const { data: historyData } = getExerciseHistory([exerciseIds], page, 10);
    history = historyData;
  }

  return <div>History</div>;
};

export default History;
