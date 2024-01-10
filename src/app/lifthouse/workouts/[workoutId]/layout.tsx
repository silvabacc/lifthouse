import { LayoutAnimation } from "@/app/aniamtions/layoutAnimation";
import { WorkoutIdContextProvider } from "./context";

export default function WorkoutIdLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { workoutId: number };
}) {
  return (
    <LayoutAnimation>
      <WorkoutIdContextProvider workoutId={params.workoutId}>
        {children}
      </WorkoutIdContextProvider>
    </LayoutAnimation>
  );
}
