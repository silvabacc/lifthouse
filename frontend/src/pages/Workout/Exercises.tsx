import {
  ExerciseType,
  LogEntry,
  RepRange,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import {
  Card,
  Collapse,
  Divider,
  Layout,
  Select,
  SelectProps,
  Space,
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

const { Text } = Typography;
const { Panel } = Collapse;
const { Content, Footer } = Layout;

const DoneIcon = <CheckCircleOutlined style={{ color: colors.success }} />;

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
          <div
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
          </div>
        </Footer>
      )}
    </Layout>
  );
};

const FullContent: React.FC = () => {
  const { workoutData, isLoading } = useWorkoutContext();

  return (
    <>
      {isLoading && <SkeletonContent />}
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
            {/* <PerformanceChart exerciseId={routineExercise.exerciseId} /> */}
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
      {isLoading && <SkeletonContent rows={1} />}
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
            children: "Not Implemented Yet",
            // children: (
            //   <PerformanceChart exerciseId={routineExercise.exerciseId} />
            // ),
          },
        ];

        return (
          <CollapseExercise
            size="large"
            collapsible={isEditing ? "disabled" : "header"}
            key={`${routineExercise.exerciseId}-${idx}`}
            style={{ margin: 16 }}
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
  const { workoutData, setWorkoutData, isEditing, routineType } =
    useWorkoutContext();
  const { queryExercises } = useWorkout();
  const { data: allExercises = [], refetch: fetchQueryExercises } =
    queryExercises();
  const { clearTemporaryStorageForExercise } = useTemporaryStorage();

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

    clearTemporaryStorageForExercise(routineExercise.exerciseId);
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

    clearTemporaryStorageForExercise(routineExercise.exerciseId);
    setWorkoutData({
      routine: { ...workoutData.routine, exercises: exerciseIds },
      exercises,
    });
  };

  const additionalExercises = (options: SelectProps["options"]) => {
    const exerciseType = allExercises.find(
      (exercise) => exercise.exerciseId === options?.[0].value
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
    .sort((a, b) => a.label.localeCompare(b.label));

  const exerciseOptions = additionalExercises(exercisesWithType);

  const repRangeOptions = RepRangeMapping[routineType!].map(
    (setRepRange: RepRange) => {
      return {
        value: `${setRepRange.sets} x ${setRepRange.reps}`,
      };
    }
  );

  const TitleContent = isEditing ? (
    <>
      <SelectExercise
        style={{ flex: 5, width: "50%" }}
        dropdownRender={(menu) => (
          <>
            <Space style={{ paddingLeft: 8, paddingBottom: 8 }}>
              <Text strong>{exerciseInfo?.exerciseName}</Text>
            </Space>
            <Divider style={{ margin: "0px 8px" }} />
            {menu}
          </>
        )}
        filterOption={(input, option) =>
          option
            ? option?.label
                .toLocaleLowerCase()
                .indexOf(input.toLocaleLowerCase()) >= 0
            : false
        }
        onChange={(value) => onExerciseChange(value as string)}
        showSearch
        value={exerciseInfo?.exerciseName}
        options={exerciseOptions}
      />
      <Divider type="vertical" style={{ height: 30 }} />
      <Select
        style={{ flex: 1, width: "50%" }}
        options={repRangeOptions}
        dropdownRender={(menu) => (
          <>
            <Space style={{ paddingLeft: 8, paddingBottom: 8 }}>
              <Text strong>
                {routineExercise.sets} x {routineExercise.reps}
              </Text>
            </Space>
            <Divider style={{ margin: "0px 8px" }} />
            {menu}
          </>
        )}
        defaultValue={`${routineExercise.sets} x ${routineExercise.reps}`}
        onChange={(value) => onRepRangeChange(value as string)}
      />
    </>
  ) : (
    <>
      <Text style={{ flex: 2 }} strong>
        {title}
      </Text>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          textAlign: "start",
          flex: 1,
        }}
      >
        <Divider type="vertical" style={{ height: 30 }} />
        <Text keyboard>{routineExercise.sets}</Text>
        <Text style={{ textAlign: "center" }}>x</Text>
        <Text keyboard style={{ maxWidth: 80, minWidth: 35 }}>
          {routineExercise.reps}
        </Text>
      </div>
    </>
  );

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontWeight: "normal",
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
            padding: 16,
            margin: 16,
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
  }
`;

const SelectExercise = styled(Select)`
  width: 100%;
`;
