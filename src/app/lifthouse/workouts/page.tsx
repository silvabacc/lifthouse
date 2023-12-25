import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import Workouts from "./workouts";

export async function getData() {
  return [];
}

export default async function WorkoutsPage() {
  const workouts = await getData();
  return (
    <PageStartAnimation>
      <Workouts workouts={[]} />
    </PageStartAnimation>
  );
}
