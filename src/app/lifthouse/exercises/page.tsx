"use client";

import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { useFetch } from "@/app/hooks/useFetch";
import { Exercise, PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import ExerciseCardSkeleton from "./exercises.skeleton";
import dynamic from "next/dynamic";

const ExerciseDrawer = dynamic(() => import("./drawer"));

const { Search } = Input;
const { CheckableTag } = Tag;

export default function Exercises() {
  const { fetch } = useFetch();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<PrimaryMuscleGroup[]>([]);
  const [expandedFilter, setExpandedFilter] = useState(false);
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

  const handleChange = (tag: PrimaryMuscleGroup, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  const onClickCard = (exercise: Exercise) => {
    setShowDrawer((prev) => !prev);
    setSelectedExercise(exercise);
  };

  return (
    <PageAnimation>
      <div className="sticky top-0 w-full bg-white p-2 mb-4 shadow">
        <div className="flex justify-between w-full pb-2">
          <Search
            className="w-full pr-2"
            onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
          />
          <Button onClick={() => setExpandedFilter((prev) => !prev)}>
            <FilterOutlined />
          </Button>
        </div>
        {expandedFilter && (
          <div className="flex pb-2 overflow-auto ">
            {Object.values(PrimaryMuscleGroup).map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags.includes(tag)}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
        )}
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
