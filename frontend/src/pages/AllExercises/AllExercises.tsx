import { Card, Col, Divider, Row, Typography, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Exercise, ExerciseType } from "@backend/types";
import { useAllExercises } from "./useAllExercises";
import { AllExerciseContainer } from "./AllExercises.style";

const { Meta } = Card;
const { Title, Text } = Typography;
const { Search } = Input;

const ExerciseTitleMapping = {
  [ExerciseType.VERTICAL_PRESS]: "Vertical Press",
  [ExerciseType.HORIZONTAL_PRESS]: "Horizontal Press",
  [ExerciseType.VERTICAL_PULL]: "Vertical Pull",
  [ExerciseType.ACCESSORY_CHEST]: "Accessory Chest",
  [ExerciseType.UPPER_BACK]: "Upper Back",
  [ExerciseType.ABS]: "Abs",
  [ExerciseType.LEGS_SQUAT]: "Squat",
  [ExerciseType.LEGS_DV]: "Deadlift Variation",
  [ExerciseType.ACCESSORY_LEGS]: "Accessory Legs",
  [ExerciseType.BICEPS]: "Biceps",
  [ExerciseType.TRICEPS]: "Triceps",
  [ExerciseType.FOREARMS]: "Forearms",
  [ExerciseType.ACCESSORY_SHOULDER]: "Accessory Shoulders",
  [ExerciseType.TRAPS]: "Traps",
};

const AllExercises: React.FC = () => {
  const { fetchAllExercises } = useAllExercises();
  const { data } = fetchAllExercises();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    if (data) {
      setExercises((prev) => [...prev, ...data]);
    }
  }, [data]);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const Exercises = (type: ExerciseType) => {
    const exercisesType = exercises
      .filter((e) => e.exerciseType === type)
      .filter((e) =>
        e.exerciseName.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );

    if (exercisesType.length === 0) {
      return <Text>No exercises found</Text>;
    }

    return (
      <>
        {exercisesType.map((exercise, idx) => {
          return (
            <Col key={`${idx}-${exercise.exerciseName}`} span={12}>
              <Card style={{ height: "100%" }}>
                <Meta title={exercise.exerciseName} />
              </Card>
            </Col>
          );
        })}
      </>
    );
  };

  return (
    <AllExerciseContainer>
      <Search
        placeholder="Search exercise"
        onChange={(e) => onSearch(e.target.value)}
      />
      {Object.values(ExerciseType).map((type, idx) => {
        return (
          <div key={`${idx}-${type}`}>
            <Divider style={{ margin: 8 }} />
            <Title key={type} level={4}>
              {ExerciseTitleMapping[type]}
            </Title>
            <Row gutter={[6, 6]}>{Exercises(type)}</Row>
          </div>
        );
      })}
      <Title level={4}>Upper Intensity</Title>
    </AllExerciseContainer>
  );
};

export default AllExercises;
