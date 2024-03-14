import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, FiveThreeOne } from "@/lib/supabase/db/types";
import { createContext, useContext, useEffect, useState } from "react";

type FiveThreeOneContextType = {
  fiveThreeOneInfo: FiveThreeOne;
  setFiveThreeOneInfo: (info: FiveThreeOne) => void;
  loading: boolean;
};

const FiveThreeOneContext = createContext<FiveThreeOneContextType>(
  {} as FiveThreeOneContextType
);

const useFiveThreeOneContext = () => useContext(FiveThreeOneContext);

const FiveThreeOneContextProvider = ({ children }: any) => {
  const [fiveThreeOneInfo, setFiveThreeOneInfo] = useState<FiveThreeOne>();
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
  }, []);

  if (!fiveThreeOneInfo) {
    return null;
  }

  return (
    <FiveThreeOneContext.Provider
      value={{
        fiveThreeOneInfo,
        setFiveThreeOneInfo,
        loading,
      }}
    >
      {children}
    </FiveThreeOneContext.Provider>
  );
};

export { FiveThreeOneContextProvider, useFiveThreeOneContext };
