"use client";

import { useFiveThreeOneContext } from "./context";
import { updateFiveThreeOnePersonalBests } from "./actions";

export function useFiveThreeOne() {
  const { fiveThreeOneInfo, setFiveThreeOneInfo } = useFiveThreeOneContext();

  const increasePersonalBests = async () => {
    const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;
    const updated = await updateFiveThreeOnePersonalBests({
      bench: bench.pb + 2,
      squat: squat.pb + 5,
      deadlift: deadlift.pb + 5,
      ohp: ohp.pb + 2,
    });
    setFiveThreeOneInfo(updated);
  };

  return { increasePersonalBests };
}
