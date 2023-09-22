import { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { DailyWeighInMonth, useDatabase } from "@frontend/hooks/useDatabase";
import { DailyWeighIn } from "@backend/types";

interface DailyWeightInContextType {
  selectedValue: dayjs.Dayjs;
  setSelectedValue: (value: dayjs.Dayjs) => void;
  monthSelected: number;
  setMonthSelected: (value: number) => void;
  yearSelected: number;
  setYearSelected: (value: number) => void;
  dailyWeightInData: DailyWeighInMonth[];
  isLoading: boolean;
  refetch: () => void;
}

const DailyWeightInContext = createContext<DailyWeightInContextType>({} as any);

const useDailyWeightInContext = () => useContext(DailyWeightInContext);

// Create a provider component
const DailyWeightInContextProvider = ({ children }: any) => {
  // Define your state or any data you want to share
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  //Might need to look into this type
  const [dailyWeightInData, setDailyWeighInData] = useState<
    DailyWeighInMonth[]
  >([]);

  const { getDailyWeighInsForMonth } = useDatabase();

  const { data, isLoading, refetch } = getDailyWeighInsForMonth(
    monthSelected,
    yearSelected
  );

  useEffect(() => {
    if (data) {
      setDailyWeighInData(data);
    }
  }, [data]);

  return (
    <DailyWeightInContext.Provider
      value={{
        selectedValue,
        setSelectedValue,
        monthSelected,
        setMonthSelected,
        yearSelected,
        setYearSelected,
        dailyWeightInData,
        isLoading,
        refetch,
      }}
    >
      {children}
    </DailyWeightInContext.Provider>
  );
};

export { DailyWeightInContextProvider, useDailyWeightInContext };
