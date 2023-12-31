export default function WorkoutPlanPage({
  params,
}: {
  params: { workoutId: number };
}) {
  return <div>My Id: {params.workoutId}</div>;
}
