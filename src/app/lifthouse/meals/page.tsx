import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import Meals from "./meals";

export default function MealsPage() {
  return (
    <PageAnimation className="flex flex-col items-center bg-white h-full overflow-y-auto">
      <Meals />
    </PageAnimation>
  );
}
