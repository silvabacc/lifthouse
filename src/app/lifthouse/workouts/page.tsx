import { PageStartAnimation } from "@/app/aniamtions/pageStartAnimation";
import Workouts from "./workouts";

export default async function WorkoutsPage() {
  return (
    <PageStartAnimation>
      <Workouts />
    </PageStartAnimation>
  );
}
