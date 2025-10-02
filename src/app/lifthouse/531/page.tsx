import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import Introduction from "./components/intro";
import { Card, Skeleton } from "antd";
import DatabaseClient from "@/lib/supabase/db/dbClient";
import Info from "./components/info";
import Weeks from "./weeks";
import { getFiveThreeOneData } from "./actions";

export default async function FiveThreeOnePage() {
  const data = await getFiveThreeOneData();
  const { bench, squat, deadlift, ohp } = data;

  const exercises = [bench, squat, deadlift, ohp];

  return (
    <PageAnimation>
      <Introduction info={data} />
      <div className="grid lg:grid-cols-4 gap-4">
        {exercises.map((lift) => (
          <Card key={lift?.exercise?.name}>
            <CardContent title={lift?.exercise?.name} value={lift?.pb} />
          </Card>
        ))}
      </div>
      <Info />
      <Weeks info={data} />
    </PageAnimation>
  );
}

type Props = {
  title?: string;
  value?: number;
  isLoading?: boolean;
};
function CardContent({ title, value, isLoading }: Props) {
  return (
    <div className="flex justify-between">
      <h2 className="text-xl font-bold p-0 m-0">{title}</h2>
      {isLoading ? (
        <Skeleton.Button active />
      ) : (
        <div className="flex flex-col ml-4 whitespace-nowrap">
          <span className=" font-bold text-blue-500 text-lg ">{value} kg</span>
          <span className="text-right text-xs text-neutral-500">
            90% {((value || 0) * 0.9).toFixed(0)} kg
          </span>
        </div>
      )}
    </div>
  );
}
