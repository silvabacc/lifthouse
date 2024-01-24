"use client";

import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import dayjs from "dayjs";
import { useFetch } from "@/app/hooks/useFetch";
import { Weight } from "@/lib/supabase/db/types";

interface WeightCalendar extends Omit<Weight, "date"> {
  date: dayjs.Dayjs;
}

interface WeightContextType {
  selectedValue: dayjs.Dayjs;
  setSelectedValue: (value: dayjs.Dayjs) => void;
  monthSelected: number;
  setMonthSelected: (value: number) => void;
  yearSelected: number;
  setYearSelected: (value: number) => void;
  weightData: WeightCalendar[];
  setWeightData: Dispatch<SetStateAction<WeightCalendar[]>>;
}

const WeightContext = createContext<WeightContextType>({} as any);

const useWeightInContext = () => useContext(WeightContext);

const WeightContextProvider = ({ children }: any) => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [weightData, setWeightData] = useState<WeightCalendar[]>([]);
  const { fetch } = useFetch();

  //Fetch data here
  useEffect(() => {
    const fetchWeightData = async () => {
      const result: Weight[] = await fetch(
        `/api/weight?month=${monthSelected}&year=${yearSelected}`
      );
      const transform = result.map((r) => {
        return { ...r, date: dayjs(r.date) };
      });
      setWeightData(transform);
    };

    fetchWeightData();
  }, []);

  return (
    <WeightContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        monthSelected,
        setMonthSelected,
        yearSelected,
        setYearSelected,
        weightData,
        setWeightData,
      }}
    >
      {children}
    </WeightContext.Provider>
  );
};

export { WeightContextProvider, useWeightInContext };
