import React, { useState } from "react";
import { useWorkout } from "../useWorkout";

interface HistoryProps {
  exerciseId: string;
}

export const History: React.FC<HistoryProps> = ({ exerciseId }) => {
  const { getExerciseHistory, deleteLogEntry, updateLogEntries } = useWorkout();
  const [offset, setOffset] = useState(0);

  const { isLoading, data } = getExerciseHistory(exerciseId, offset, 10);

  return <div>History</div>;
};

export default History;
