"use client";

import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { Input, Tag } from "antd";
import { useEffect, useState } from "react";
import ExerciseCardSkeleton from "./exercises.skeleton";
import ExerciseDrawer from "./drawer";
import SearchElement from "../components/search";

const { Search } = Input;
const { CheckableTag } = Tag;

export default function Exercises() {
  const { fetch } = useFetch();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<PrimaryMuscleGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState<Exercise>();
  const [showDrawer, setShowDrawer] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchExercises = async () => {
      const response = await fetch("/api/exercises");
      setExercises(response);
      setLoading(false);
    };
    fetchExercises();
  }, []);

  const onClickCard = (exercise: Exercise) => {
    setShowDrawer((prev) => !prev);
    setSelectedExercise(exercise);
  };

  return (
    <PageAnimation>
      <div className="sticky top-0 w-full py-2 mb-4 shadow">
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
      {loading && <ExerciseCardSkeleton />}
      <div className="grid lg:grid-cols-3 gap-4">
        {exercises
          ?.filter((o) => o.name.toLocaleLowerCase().includes(searchQuery))
          .filter((exercise) =>
            selectedTags.length
              ? selectedTags.includes(exercise.primaryMuscleGroup)
              : true
          )
          .map((exercise) => {
            return (
              <div
                key={exercise.exerciseId}
                className="bg-white rounded p-6 cursor-pointer"
                onClick={() => onClickCard(exercise)}
              >
                <p className="text-base font-medium pb-2">{exercise.name}</p>
                <p className="text-sm leading-6 text-gray-400">
                  {exercise.primaryMuscleGroup}
                </p>
              </div>
            );
          })}
      </div>
      <ExerciseDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        exercise={selectedExercise}
      />
    </PageAnimation>
  );
}
