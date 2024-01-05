import { useFetch } from "@/app/hooks/useFetch";
import { Exercise } from "@/lib/supabase/db/types";
import { useEffect, useState } from "react";

export function useExercises() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { fetch } = useFetch();

  useEffect(() => {
    const fetchExercises = async () => {
      const exercisesResponse: Exercise[] = await fetch("/api/exercises");
      setExercises(exercisesResponse);
    };

    fetchExercises();
  }, []);

  return { exercises };
}
