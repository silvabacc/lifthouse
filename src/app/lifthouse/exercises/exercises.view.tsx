"use client";

import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { useState } from "react";
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
      <div className="w-full py-2 mb-4 shadow">
        <SearchElement
          filterTagOptions={Object.keys(PrimaryMuscleGroup)}
          placerHolder="Search exercises"
          selectedTags={selectedTags}
          setSelectedTags={(tags) =>
            setSelectedTags(tags as PrimaryMuscleGroup[])
          }
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="h-screen">
        <div className="h-full overflow-auto grid lg:grid-cols-3 gap-4">
          {filtered.map((exercise) => (
            <div
              key={exercise.exerciseId}
              className="bg-white rounded p-6 cursor-pointer"
              onClick={() => {
                setSelectedExercise(exercise);
                setShowDrawer(true);
              }}
            >
              <p className="text-base font-medium pb-2">{exercise.name}</p>
              <p className="text-sm leading-6 text-gray-400">
                {exercise.primaryMuscleGroup}
              </p>
            </div>
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
