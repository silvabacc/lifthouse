type WorkoutExercise = {
  exerciseId: number;
  sets: number;
  reps: string;
};

export type Workout = {
  workoutId: number;
  name: string;
  description: string;
  exercises: WorkoutExercise[];
  userId: string;
};
