import { useFetch } from "@/app/hooks/useFetch";
import { useLocalStorage } from "@/app/hooks/useLocalStorage";
import { Exercise, FiveThreeOne } from "@/lib/supabase/db/types";
import { createContext, useContext, useEffect, useState } from "react";
import FiveThreeOneSkeleton from "./fiveThreeOne.skeleton";

type FiveThreeOneContextType = {
  fiveThreeOneInfo: FiveThreeOne;
  setFiveThreeOneInfo: (info: FiveThreeOne) => void;
  week: number;
  setWeek: (week: number) => void;
  loading: boolean;
  completed: number[];
  setCompleted: (completed: number[]) => void;
};

const FiveThreeOneContext = createContext<FiveThreeOneContextType>(
  {} as FiveThreeOneContextType
);

const useFiveThreeOneContext = () => useContext(FiveThreeOneContext);

const FiveThreeOneContextProvider = ({ children }: any) => {
  const [fiveThreeOneInfo, setFiveThreeOneInfo] = useState<FiveThreeOne>();
  const { getCachedFiveThreeOneInfo } = useLocalStorage();
  const [week, setWeek] = useState(1);
  const [completed, setCompleted] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetch } = useFetch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: FiveThreeOne = await fetch("/api/531");
      setLoading(false);
      setFiveThreeOneInfo(response);
    };
    fetchData();

    const cachedInfo = getCachedFiveThreeOneInfo();
    if (cachedInfo) {
      setWeek(cachedInfo.week);
      setCompleted(cachedInfo.completed);
    }
  }, []);

  if (loading || !fiveThreeOneInfo) {
    return <FiveThreeOneSkeleton />;
  }

  return (
    <FiveThreeOneContext.Provider
      value={{
        fiveThreeOneInfo,
        setFiveThreeOneInfo,
        week,
        setWeek,
        completed,
        setCompleted,
        loading,
      }}
    >
      {children}
    </FiveThreeOneContext.Provider>
  );
};

export { FiveThreeOneContextProvider, useFiveThreeOneContext };
