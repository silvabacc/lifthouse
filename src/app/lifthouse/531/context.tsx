"use client";

import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { createContext, useContext, useEffect, useState } from "react";

type FiveThreeOneContextType = {
  fiveThreeOneInfo: FiveThreeOne;
  setFiveThreeOneInfo: (info: FiveThreeOne) => void;
  week: number;
  setWeek: (week: number) => void;
  completed: number[];
  setCompleted: (completed: number[]) => void;
};

const FiveThreeOneContext = createContext<FiveThreeOneContextType>(
  {} as FiveThreeOneContextType
);

const useFiveThreeOneContext = () => useContext(FiveThreeOneContext);

type Props = {
  children: React.ReactNode;
  initialFiveThreeOne: FiveThreeOne;
};

const FiveThreeOneContextProvider = ({ children, initialFiveThreeOne }: Props) => {
  const { getCachedFiveThreeOneInfo } = useLocalStorage();

  const [fiveThreeOneInfo, setFiveThreeOneInfo] = useState(initialFiveThreeOne);
  const [week, setWeek] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);

  useEffect(() => {
    const cached = getCachedFiveThreeOneInfo();
    if (!cached) return;
    setWeek(cached.week);
    setCompleted(cached.completed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <FiveThreeOneContext.Provider
      value={{ fiveThreeOneInfo, setFiveThreeOneInfo, week, setWeek, completed, setCompleted }}
    >
      {children}
    </FiveThreeOneContext.Provider>
  );
};

export { FiveThreeOneContextProvider, useFiveThreeOneContext };
