import { useFetch } from "@/app/hooks/useFetch";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { useFiveThreeOneContext } from "./context";

export function useFiveThreeOne() {
  const { fetch } = useFetch();
  const { setWeek, fiveThreeOneInfo, setFiveThreeOneInfo } =
    useFiveThreeOneContext();

  const increasePersonalBests = async () => {
    const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

    const response: FiveThreeOne = await fetch("/api/531", {
      method: "POST",
      // Increase the weights by 5kg for lower body and 2kg for upper body
      body: JSON.stringify({
        bench: bench.pb + 2,
        squat: squat.pb + 5,
        deadlift: deadlift.pb + 5,
        ohp: ohp.pb + 2,
      }),
    });
    setFiveThreeOneInfo(response);
  };

  return { increasePersonalBests };
}
