export default function WorkoutPlanPage({
  params,
}: {
  params: { workoutId: string };
}) {
  return <div>My Id: {params.workoutId}</div>;
}
