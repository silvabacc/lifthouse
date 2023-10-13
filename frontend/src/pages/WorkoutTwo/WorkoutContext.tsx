import { createContext, useContext, useState } from "react";

interface WorkoutcontextType {
  isEditing: boolean;
  setEditing: (isEditing: boolean) => void;
}

const WorkoutContext = createContext<WorkoutcontextType>({} as any);

const useWorkoutContext = () => useContext(WorkoutContext);

const WorkoutContextProvider = ({ children }: any) => {
  const [isEditing, setEditing] = useState(false);
  const [] = useState(false);

  return (
    <WorkoutContext.Provider
      value={{
        isEditing,
        setEditing,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContextProvider, useWorkoutContext };
