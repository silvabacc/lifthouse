import { AutoComplete, AutoCompleteProps, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ExerciseType, Routine } from "../../../../backend/data";
import { useDatabase } from "../hooks/useDatabase";
import { Exercises } from "../../../../backend/db";

interface EditExerciseProps extends AutoCompleteProps {
  placeholder?: string;
  exerciseType: ExerciseType;
}

const SelectExercise: React.FC<EditExerciseProps> = ({
  placeholder,
  exerciseType,
  ...props
}) => {
  const { fetchExercises } = useDatabase();
  const { data } = fetchExercises(exerciseType);
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    []
  );

  useEffect(() => {
    if (data) {
      const options = data.map((exercise) => ({
        label: exercise,
        value: exercise,
      }));
      setOptions(options);
    }
  }, [data]);

  return (
    <>
      <Select
        {...props}
        style={{ width: "90%" }}
        showSearch
        defaultValue={placeholder}
        options={options}
      />
    </>
  );
};

export default SelectExercise;
