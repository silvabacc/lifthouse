import { AutoComplete, AutoCompleteProps, Select } from "antd";
import React, { useEffect, useState } from "react";
import { ExerciseType, Routine } from "../../../../backend/data";
import { useDatabase } from "../hooks/useDatabase";
import { Exercises } from "../../../../backend/db";

interface EditExerciseProps extends AutoCompleteProps {
  placeholder?: string;
  exerciseType: ExerciseType;
}

const EditExercise: React.FC<EditExerciseProps> = ({
  placeholder,
  exerciseType,
}) => {
  const { fetchExercises } = useDatabase();
  const { data } = fetchExercises(exerciseType);
  const [options, setOptions] = useState<{ value: string }[]>([]);

  useEffect(() => {
    if (data) {
      const options = data.map((exercise) => ({ value: exercise }));
      setOptions(options);
    }
  }, [data]);

  return (
    <>
      <Select
        style={{ width: "90%" }}
        showSearch
        defaultValue={placeholder}
        options={options}
      />
    </>
  );
};

export default EditExercise;
