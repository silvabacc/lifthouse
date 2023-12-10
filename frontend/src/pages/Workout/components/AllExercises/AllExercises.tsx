import { Card, Col, Divider, Row, Typography, Input, Modal, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { Exercise, ExerciseType } from "@backend/types";
import { AllExerciseContainer } from "./AllExercises.style";
import History from "../History";
import { useWorkout } from "../../useWorkout";
import PerformanceChart from "../PerformanceChart";
import { useScreen } from "@frontend/hooks/useScreen";

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
  const { fetchAllExercises } = useWorkout();
  const { data } = fetchAllExercises();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState("");
  const { isMobile } = useScreen();

  useEffect(() => {
    if (data) {
      setExercises((prev) => [...prev, ...data]);
    }
  }, [data]);

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const onExerciseSelect = (exerciseId: string) => {
    setSelectedExercise(exerciseId);
    setShowModal(true);
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
              <Card
                style={{ height: "100%", cursor: "pointer" }}
                onClick={() => onExerciseSelect(exercise.exerciseId)}
              >
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
      <Modal
        open={showModal}
        width={"100%"}
        onCancel={() => {
          setSelectedExercise("");
          setShowModal(false);
        }}
        footer={false}
      >
        {isMobile ? (
          <TabbedView exerciseId={selectedExercise} />
        ) : (
          <FullView exerciseId={selectedExercise} />
        )}
      </Modal>
    </AllExerciseContainer>
  );
};

interface Props {
  exerciseId: string;
}
const TabbedView: React.FC<Props> = ({ exerciseId }) => {
  const items = [
    {
      label: "History",
      key: "1",
      children: <History exerciseId={exerciseId} />,
    },
    {
      label: "Charts",
      key: "2",
      children: <PerformanceChart exerciseId={exerciseId} />,
    },
  ];

  return <Tabs items={items} />;
};

const FullView: React.FC<Props> = ({ exerciseId }) => {
  return (
    <div style={{ display: "flex", marginTop: 16 }}>
      <div
        style={{
          width: "50%",
        }}
      >
        <History exerciseId={exerciseId} />
      </div>
      <div style={{ width: "50%" }}>
        <PerformanceChart exerciseId={exerciseId} />
      </div>
    </div>
  );
};

export default AllExercises;
