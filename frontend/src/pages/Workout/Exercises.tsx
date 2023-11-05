import {
  ExerciseType,
  RepRange,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import {
  Card,
  Collapse,
  Divider,
  Input,
  Layout,
  Select,
  SelectProps,
  Tabs,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { Skeleton } from "antd";
import { useScreen } from "@frontend/hooks/useScreen";
import { useWorkoutContext } from "./WorkoutContext";
import { SetsRepsSteps } from "./components/SetsRepsSteps";
import History from "./components/History";
import WorkoutButton from "./components/WorkoutButton";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { useNavigate } from "react-router";
import { useWorkout } from "./useWorkout";
import styled from "styled-components";
import colors from "@frontend/theme/colors";
import { IntensityRepRange, VolumeRepRange } from "@backend/data";
import { CheckCircleOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import PerformanceChart from "./components/PerformanceChart";

const { Text } = Typography;
const { Panel } = Collapse;
const { Content, Footer } = Layout;
const { Search } = Input;

const DoneIcon = (
  <div>
    <CheckCircleOutlined style={{ color: colors.success, paddingRight: 12 }} />
  </div>
);

const RepRangeMapping = {
  [RoutineType.UPPER_INTENSITY]: IntensityRepRange,
  [RoutineType.LOWER_INTENSITY]: IntensityRepRange,
  [RoutineType.UPPER_VOLUME]: VolumeRepRange,
  [RoutineType.LOWER_VOLUME]: VolumeRepRange,
};

export const Exercises: React.FC = () => {
  const { isMobile } = useScreen();
  const [saving, setSaving] = useState(false);
  const { clearTemporaryStorage } = useTemporaryStorage();
  const navigate = useNavigate();
  const { logEntry } = useWorkout();
  const { workoutData, isEditing } = useWorkoutContext();

  const finishWorkout = async () => {
    setSaving(true);
    const saved = await logEntry(workoutData.exercises);
    if (saved) {
      clearTemporaryStorage();
      navigate("/");
      setSaving(false);
    }
  };

  const ExerciseCardContent = isMobile ? PanelContent : FullContent;

  return (
    <Layout style={{ backgroundColor: "white" }}>
      <Content>
        <ExerciseCardContent />
      </Content>
      {!isEditing && (
        <Footer>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              display: "flex",
              justifyContent: isMobile ? "center" : "flex-end",
              background: "white",
              position: "fixed",
              right: 0,
              bottom: 0,
              borderTop: `0.1px solid ${colors.grey}`,
              paddingRight: 16,
              width: "100%",
            }}
          >
            <WorkoutButton
              type={saving ? "default" : "primary"}
              onClick={() => {
                finishWorkout();
              }}
            >
              {saving ? "Saving..." : "Finish Workout"}
            </WorkoutButton>
          </motion.div>
        </Footer>
      )}
    </Layout>
  );
};

const FullContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();

  return (
    <>
      {isLoading ||
        (workoutData.routine.exercises.length === 0 && (
          <SkeletonContent rows={3} />
        ))}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        return (
          <Card
            style={{ margin: 16 }}
            title={<ExerciseTitle routineExercise={routineExercise} />}
            key={`${routineExercise.exerciseId}-${idx}`}
          >
            <div style={{ display: "flex" }}>
              <SetsRepsSteps exercise={routineExercise} />
              <Divider style={{ margin: 16, height: 300 }} type="vertical" />
              <History exerciseId={routineExercise.exerciseId} />
            </div>
            <PerformanceChart exerciseId={routineExercise.exerciseId} />
          </Card>
        );
      })}
    </>
  );
};

const PanelContent: React.FC = () => {
  const { workoutData, isLoading, isEditing } = useWorkoutContext();

  return (
    <>
      {isLoading ||
        (workoutData.routine.exercises.length === 0 && (
          <SkeletonContent rows={3} />
        ))}
      {workoutData.routine.exercises.map((routineExercise, idx) => {
        const items = [
          {
            label: "Sets",
            key: "1",
            children: <SetsRepsSteps exercise={routineExercise} />,
          },
          {
            label: "History",
            key: "2",
            children: <History exerciseId={routineExercise.exerciseId} />,
          },
          {
            label: "Charts",
            key: "3",
            children: (
              <PerformanceChart exerciseId={routineExercise.exerciseId} />
            ),
          },
        ];

        return (
          <CollapseExercise
            collapsible={isEditing ? "disabled" : "header"}
            key={`${routineExercise.exerciseId}-${idx}`}
            style={{ marginTop: 8, marginBottom: 18, minWidth: 320 }}
          >
            <Panel
              key={`${routineExercise.exerciseId}-${idx}`}
              header={<ExerciseTitle routineExercise={routineExercise} />}
            >
              <Tabs items={items} />
            </Panel>
          </CollapseExercise>
        );
      })}
    </>
  );
};

interface ExerciseTitleProps {
  routineExercise: RoutineExercise;
}

const ExerciseTitle: React.FC<ExerciseTitleProps> = ({ routineExercise }) => {
  const {
    workoutData,
    setWorkoutData,
    isEditing,
    routineType,
    exercisesFinished,
    setExercisesFinished,
  } = useWorkoutContext();
  const { queryExercises } = useWorkout();
  const { data: allExercises = [], refetch: fetchQueryExercises } =
    queryExercises();
  const [searchQuery, setSearchQuery] = useState("");
  const { getTemporaryStorage } = useTemporaryStorage();

  useEffect(() => {
    const fetch = async () => {
      const tempStorage = await getTemporaryStorage(routineExercise.exerciseId);
      const exerciseFinished =
        routineExercise.sets ===
        tempStorage?.info[tempStorage?.info.length - 1].set;

      if (exerciseFinished) {
        setExercisesFinished((prev) => [...prev, routineExercise.exerciseId]);
      }
    };

    fetch();
  }, []);

  const title = workoutData.exercises.find(
    (e) => e.exerciseId === routineExercise.exerciseId
  )?.exerciseName;

  useEffect(() => {
    if (isEditing) {
      fetchQueryExercises();
    }
  }, [isEditing]);

  const onRepRangeChange = (value: string) => {
    const [sets, reps] = value.split(" x ");
    const exerciseIndex = workoutData.exercises.findIndex((e) => {
      return e.exerciseId === routineExercise.exerciseId;
    });

    const exercises = workoutData.routine.exercises.slice();
    exercises[exerciseIndex] = {
      ...exercises[exerciseIndex],
      sets: parseInt(sets),
      reps: reps,
    };

    setWorkoutData({
      routine: { ...workoutData.routine, exercises },
      exercises: workoutData.exercises,
    });
  };

  const onExerciseChange = (exerciseId: string) => {
    const updatedExercise = allExercises.find(
      (e) => e.exerciseId === exerciseId
    );

    if (!updatedExercise) return;

    const exerciseIndex = workoutData.exercises.findIndex((e) => {
      return e.exerciseId === routineExercise.exerciseId;
    });

    const exercises = workoutData.exercises.slice();
    exercises[exerciseIndex] = updatedExercise;

    const exerciseIds = exercises.map((e) => ({
      sets: routineExercise.sets,
      reps: routineExercise.reps,
      exerciseId: e.exerciseId,
    }));

    setWorkoutData({
      routine: { ...workoutData.routine, exercises: exerciseIds },
      exercises,
    });
  };

  const additionalExercises = (options: SelectProps["options"]) => {
    const exerciseType = allExercises.find(
      (exercise) => exercise.exerciseId === options?.[0]?.value
    )?.exerciseType;

    if (!exerciseType) return options;

    if (ExerciseType.BICEPS === exerciseType) {
      return [
        {
          label: "Biceps",
          options,
        },
        {
          label: "Forearms",
          options: allExercises
            .filter((e) => e.exerciseType === ExerciseType.FOREARMS)
            .map((exercise) => ({
              label: exercise.exerciseName,
              value: exercise.exerciseId,
            })),
        },
      ];
    }

    if (ExerciseType.FOREARMS === exerciseType) {
      return [
        {
          label: "Forearms",
          options,
        },
        {
          label: "Biceps",
          options: allExercises
            .filter((e) => e.exerciseType === ExerciseType.BICEPS)
            .map((exercise) => ({
              label: exercise.exerciseName,
              value: exercise.exerciseId,
            })),
        },
      ];
    }

    return options;
  };

  const exerciseInfo = allExercises.find(
    (exerciseFromList) =>
      exerciseFromList.exerciseId === routineExercise.exerciseId
  );

  const exercisesWithType = allExercises
    //Filters exercises by type e.g. Vertical Push, Horizontal Push, etc
    .filter(
      (exerciseFromList) =>
        exerciseInfo?.exerciseType === exerciseFromList.exerciseType
    )
    //Removes any duplicated exercises from the list if already in the routine
    .filter(
      (exerciseFromList) =>
        !workoutData.exercises
          .map((i) => i.exerciseId)
          .includes(exerciseFromList.exerciseId)
    )
    //Maps the exercises to the format required by the Select component
    .map((exerciseFromList) => ({
      value: exerciseFromList.exerciseId,
      label: exerciseFromList.exerciseName,
    }))
    //Sorts the exercises alphabetically
    .sort((a, b) => a.label.localeCompare(b.label))
    //Search query
    .filter((exercise) =>
      exercise.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const exerciseOptions = additionalExercises(exercisesWithType);

  const repRangeOptions = RepRangeMapping[routineType!].map(
    (setRepRange: RepRange) => {
      return {
        value: `${setRepRange.sets} x ${setRepRange.reps}`,
      };
    }
  );

  const SearchBar = (menu: React.ReactElement) => {
    return (
      <>
        <Search
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: "4px 0px" }}
        />
        <Divider style={{ margin: "0px 12px" }} />
        {menu}
      </>
    );
  };

  const loadingExercises = !exerciseInfo?.exerciseName;

  const TitleContent = isEditing ? (
    <EditingTitleContainer>
      {loadingExercises ? (
        <Skeleton title={false} />
      ) : (
        <>
          <SelectExerciseContainer>
            <Select
              dropdownMatchSelectWidth={false}
              dropdownStyle={{ width: 300 }}
              bordered={false}
              dropdownRender={SearchBar}
              onChange={(value) => onExerciseChange(value as string)}
              value={exerciseInfo?.exerciseName}
              options={exerciseOptions as { label: string; value: string }[]}
            />
          </SelectExerciseContainer>
          <Divider type="vertical" style={{ height: 30 }} />
          <Select
            style={{ width: 130 }}
            options={repRangeOptions}
            defaultValue={`${routineExercise.sets} x ${routineExercise.reps}`}
            onChange={(value) => onRepRangeChange(value as string)}
          />
        </>
      )}
    </EditingTitleContainer>
  ) : (
    <>
      {exercisesFinished.includes(routineExercise.exerciseId) && DoneIcon}
      <div style={{ flex: 1 }}>
        <Text strong>{title}</Text>
      </div>
      <Divider type="vertical" style={{ height: 30 }} />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          textAlign: "end",
          width: 120,
        }}
      >
        <Text keyboard>{routineExercise.sets}</Text>
        <Text>x</Text>
        <Text keyboard>{routineExercise.reps}</Text>
      </div>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      {TitleContent}
    </div>
  );
};

type SkeletonContentProps = {
  rows?: number;
};
export const SkeletonContent: React.FC<SkeletonContentProps> = ({
  rows = 8,
}) => {
  return (
    <>
      {Array.from(Array(12)).map((_, idx) => (
        <div
          key={`skeleton-${idx}`}
          style={{
            borderStyle: "solid",
            borderColor: "#f0f0f0",
            padding: 8,
            margin: 8,
          }}
        >
          <Skeleton active paragraph={{ rows }} />
        </div>
      ))}
    </>
  );
};

const CollapseExercise = styled(Collapse)`
  .ant-collapse-header-text {
    width: 95%;
    height: 85px;
  }
`;

const SelectExerciseContainer = styled.div`
  flex: 1;

  .ant-select-selector {
    padding: 0px !important;
  }

  .ant-select-selection-item {
    line-height: 1.5 !important;
    margin-right: 8px !important;
  }

  .ant-select-arrow {
    color: #000;
    padding-bottom: 8px;
  }
`;

const EditingTitleContainer = styled.div`
  width: 100%;
  display: flex;

  .ant-select {
    width: 100%;
  }

  .ant-select-selection-item {
    white-space: normal;
    word-break: break-word;
    height: 85px;
    font-weight: 600;
  }

  .ant-select-arrow {
    color: #000;
  }
`;
