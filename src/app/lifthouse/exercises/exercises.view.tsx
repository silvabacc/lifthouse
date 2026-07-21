"use client";

import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { useState } from "react";
import { RightOutlined } from "@ant-design/icons";
import ExerciseDrawer from "./drawer";
import SearchElement from "../components/search";

type Props = {
  initialExercises: Exercise[];
};

export default function ExercisesView({ initialExercises }: Props) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<PrimaryMuscleGroup[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [showDrawer, setShowDrawer] = useState(false);

  const filtered = initialExercises
    .filter((e) => e.name.toLocaleLowerCase().includes(searchQuery))
    .filter((e) =>
      selectedTags.length ? selectedTags.includes(e.primaryMuscleGroup) : true
    );

  return (
    <>
      <div className="mb-4 w-full rounded-xl border border-solid border-gray-100 bg-white p-3">
        <SearchElement
          filterTagOptions={Object.keys(PrimaryMuscleGroup)}
          placeHolder="Search exercises"
          selectedTags={selectedTags}
          setSelectedTags={(tags) =>
            setSelectedTags(tags as PrimaryMuscleGroup[])
          }
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="h-screen">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <p className="m-0 text-base font-medium text-gray-700">
              No exercises found
            </p>
            <p className="m-0 mt-1 text-sm text-gray-400">
              Try a different name or clear the muscle group filters
            </p>
          </div>
        )}
        <div className="grid h-full content-start gap-3 overflow-auto pb-24 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((exercise) => (
            <button
              type="button"
              key={exercise.exerciseId}
              className="group flex cursor-pointer items-center justify-between rounded-xl border border-solid border-gray-100 bg-white p-5 text-left transition-all hover:border-indigo-200 hover:shadow-md"
              onClick={() => {
                setSelectedExercise(exercise);
                setShowDrawer(true);
              }}
            >
              <div className="min-w-0">
                <p className="m-0 truncate text-base font-semibold text-gray-900">
                  {exercise.name}
                </p>
                <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-500">
                  {exercise.primaryMuscleGroup}
                </span>
              </div>
              <RightOutlined className="shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-indigo-500" />
            </button>
          ))}
        </div>
      </div>
      <ExerciseDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        exercise={selectedExercise}
      />
    </>
  );
}
