import { LayoutAnimation } from "@/app/aniamtions/layoutAnimation";
import { WorkoutIdContextProvider } from "./context";

export default async function WorkoutIdLayout(
  props: {
    children: React.ReactNode;
    params: Promise<{ workoutId: string }>;
  }
) {
  const params = await props.params;

  const {
    children
  } = props;

  return (
    <LayoutAnimation>
      <WorkoutIdContextProvider workoutId={params.workoutId}>
        {children}
      </WorkoutIdContextProvider>
    </LayoutAnimation>
  );
}
