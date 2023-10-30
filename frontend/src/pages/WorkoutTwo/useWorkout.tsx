import LiftHouseDatabase from "@backend/database/db";
import {
  Exercise,
  LogEntry,
  RoutineExercise,
  RoutineType,
} from "@backend/types";
import useAuthentication from "@frontend/hooks/useAuthentication";
import { useTemporaryStorage } from "@frontend/hooks/useTemporaryStorage";
import { isObject } from "chart.js/dist/helpers/helpers.core";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";

export const useWorkout = () => {
  const dbService = new LiftHouseDatabase();
  const {
    auth: { user },
  } = useAuthentication();
  const { getTemporaryStorage } = useTemporaryStorage();

  /**
   *
   * @param routineId routine id to save to.
   * @param exercises list of exercies to save for the routine
   * @returns
   */
  const updateRoutine = async (
    routineId: string,
    exercises: RoutineExercise[]
  ) => {
    await dbService.updateRoutine(routineId, exercises);
  };

  const queryRoutine = (routineType: RoutineType) => {
    return useQuery(
      ["queryRoutine", routineType, user.id],
      async () => {
        const routine = await dbService.getRoutines(routineType, user.id);
        const exerciseIds = routine.exercises.map(
          (exercise) => exercise.exerciseId
        );
        const exercises = await dbService.getExercises(exerciseIds);
        return { routine, exercises };
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  /**
   *
   * @param exerciseIds returns exercises with the given ids. If empty, returns all exercises
   * @returns Exercises
   */
  const queryExercises = (exerciseIds?: string[]) => {
    return useQuery(
      ["queryExercises", exerciseIds],
      async () => {
        const exercises = await dbService.getExercises(exerciseIds);
        return exercises;
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  const logEntry = async (exercises: Exercise[]) => {
    const temporaryStorage = exercises.map((exercise) => {
      return getTemporaryStorage(exercise.exerciseId);
    });

    const result = await Promise.all(temporaryStorage);

    return await dbService.logEntry(result, user.id);
  };

  const getExercisePerformance = (
    exerciseId: string,
    month: number,
    yearSelected: number
  ) => {
    return useQuery(
      ["getExercisePerformance", exerciseId, user.id, yearSelected],
      () => {
        return dbService.getExercisePerformance(
          exerciseId,
          user.id,
          month,
          yearSelected
        );
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  const getExerciseHistory = (exerciseId: string[], limit: number) => {
    return useQuery(
      ["getExerciseHistory", exerciseId, user.id, limit],
      () => {
        return dbService.getExerciseHistory(exerciseId, user.id, limit);
      },
      { refetchOnWindowFocus: false, keepPreviousData: true }
    );
  };

  const updateLogEntries = async (logEntries: LogEntry[]) => {
    const promises = logEntries.map((logEntry) =>
      dbService.updateExerciseHistory(logEntry)
    );
    return Promise.all(promises);
  };

  const deleteLogEntry = (logEntryId: string) => {
    return dbService.deleteLogEntry(logEntryId);
  };

  return {
    updateRoutine,
    queryRoutine,
    queryExercises,
    logEntry,
    getExerciseHistory,
    updateLogEntries,
    deleteLogEntry,
    getExercisePerformance,
  };
};
