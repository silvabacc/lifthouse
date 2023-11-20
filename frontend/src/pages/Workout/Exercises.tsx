import {
  ExerciseType,
  RepRange,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import {
  Collapse,
  Divider,
  Input,
  Layout,
  Select,
  SelectProps,
  Space,
  Tabs,
  Tooltip,
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
import { CheckCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import PerformanceChart from "./components/PerformanceChart";

const { Text } = Typography;
const { Panel } = Collapse;
const { Content, Footer } = Layout;
const { Search } = Input;

const ICON_SIZE = 18;

const DoneIcon = (
  <div>
    <CheckCircleOutlined
      style={{ color: colors.success, fontSize: ICON_SIZE }}
    />
  </div>
);

type WarningIconProps = {
  message: string;
};
const WarningIcon = ({ message }: WarningIconProps) => (
  <Tooltip color="orange" title={message} placement="left">
    <WarningOutlined style={{ color: colors.warning, fontSize: ICON_SIZE }} />
  </Tooltip>
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
            {isMobile && (
              <WorkoutButton
                type={saving ? "default" : "primary"}
                onClick={() => {
                  finishWorkout();
                }}
              >
                {saving ? "Saving..." : "Finish Workout"}
              </WorkoutButton>
            )}
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
      <CollapseExercise
        activeKey={[...Array(workoutData.exercises.length).keys()]}
        style={{ margin: 16 }}
      >
        {workoutData.routine.exercises.map((routineExercise, idx) => {
          return (
            <Panel
              key={idx}
              showArrow={false}
              header={<ExerciseTitle routineExercise={routineExercise} />}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "50%",
                  }}
                >
                  <History exerciseId={routineExercise.exerciseId} />
                </div>
                <div style={{ width: "50%" }}>
                  <PerformanceChart exerciseId={routineExercise.exerciseId} />
                </div>
              </div>
            </Panel>
          );
        })}
      </CollapseExercise>
    </>
  );
};

const PanelContent: React.FC = () => {
  const { workoutData, isLoading, isEditing, exercisesFinished } =
    useWorkoutContext();
  const { subscribeToTemporaryStorage } = useTemporaryStorage();

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

        const tempStorage = subscribeToTemporaryStorage(
          routineExercise.exerciseId
        );

        let TitleIcon = <></>;

        if (exercisesFinished.includes(routineExercise.exerciseId)) {
          const setsContainingZeroReps =
            tempStorage?.info.filter((i) => !i.reps) || [];

          const alertMessage =
            setsContainingZeroReps.length > 0
              ? `Set ${setsContainingZeroReps
                  .map((s) => s.set)
                  .join(", ")} is missing reps`
              : "";

          TitleIcon = (
            <div style={{ position: "absolute", bottom: 12, right: 12 }}>
              {setsContainingZeroReps.length > 0 ? (
                <WarningIcon message={alertMessage} />
              ) : (
                DoneIcon
              )}
            </div>
          );
        }

        return (
          <CollapseExercise
            collapsible={isEditing ? "disabled" : "header"}
            style={{ marginTop: 8, marginBottom: 18, minWidth: 320 }}
          >
            <Panel
              key={`${routineExercise.exerciseId}-${idx}`}
              header={<ExerciseTitle routineExercise={routineExercise} />}
              extra={!isEditing && TitleIcon}
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
  const { workoutData, setWorkoutData, isEditing, routineType } =
    useWorkoutContext();
  const { queryExercises } = useWorkout();
  const { data: allExercises = [], refetch: fetchQueryExercises } =
    queryExercises();
  const [searchQuery, setSearchQuery] = useState("");

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

    const routineExercises = workoutData.routine.exercises.slice();
    routineExercises[exerciseIndex] = {
      ...routineExercises[exerciseIndex],
      exerciseId: exerciseId,
    };

    setWorkoutData({
      routine: { ...workoutData.routine, exercises: routineExercises },
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
        <Space
          style={{
            width: "100%",
            justifyContent: "space-between",
          }}
          direction="vertical"
        >
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
          <Select
            options={repRangeOptions}
            style={{ paddingTop: 8 }}
            defaultValue={`${routineExercise.sets} x ${routineExercise.reps}`}
            onChange={(value) => onRepRangeChange(value as string)}
          />
        </Space>
      )}
    </EditingTitleContainer>
  ) : (
    <Space style={{ width: "100%" }} direction="vertical">
      <Text strong>{title}</Text>
      <Divider style={{ margin: 0 }} />
      <div>
        <Text keyboard>{routineExercise.sets}</Text>
        <Text>x</Text>
        <Text keyboard>{routineExercise.reps}</Text>
      </div>
    </Space>
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
