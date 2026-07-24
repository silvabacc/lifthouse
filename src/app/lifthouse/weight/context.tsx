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
import { useFetch } from "@/hooks/useFetch";
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
  isLoading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

const WeightContext = createContext<WeightContextType>({} as any);

const useWeightInContext = () => useContext(WeightContext);

const WeightContextProvider = ({ children }: any) => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [weightData, setWeightData] = useState<WeightCalendar[]>([]);
  const [isLoading, setLoading] = useState(false);
  const { fetch } = useFetch();

  useEffect(() => {
    // Stale-response guard: prevents an older month's slow response from
    // overwriting the currently selected month's data.
    let stale = false;
    setLoading(true);
    fetch<Weight[]>(`/api/weight?month=${monthSelected}&year=${yearSelected}`)
      .then((result) => {
        if (stale) return;
        setWeightData(result.map((r) => ({ ...r, date: dayjs(r.date) })));
      })
      .finally(() => {
        if (!stale) setLoading(false);
      });
    return () => {
      stale = true;
    };
  }, [monthSelected, yearSelected, fetch]);

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
        isLoading,
        setLoading,
      }}
    >
      {children}
    </WeightContext.Provider>
  );
};

export { WeightContextProvider, useWeightInContext };
