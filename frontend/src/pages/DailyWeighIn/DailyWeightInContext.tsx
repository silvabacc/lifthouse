import { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { DailyWeighInMonth, useDailyWeighIn } from "./useDailyweighIn";

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

const DailyWeightInContextProvider = ({ children }: any) => {
  const [selectedValue, setSelectedValue] = useState(() => dayjs());
  const [monthSelected, setMonthSelected] = useState(dayjs().month());
  const [yearSelected, setYearSelected] = useState(dayjs().year());
  const [dailyWeightInData, setDailyWeighInData] = useState<
    DailyWeighInMonth[]
  >([]);

  const { getDailyWeighInsForMonth } = useDailyWeighIn();

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
