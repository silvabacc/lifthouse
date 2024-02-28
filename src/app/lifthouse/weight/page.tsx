import WeightCalendar from "./components/weightCalendar";
import WeightAlert from "./components/weightAlert";
import { PageInfoPortal } from "../components/pageInfo";
import dynamic from "next/dynamic";

const WeightLine = dynamic(() => import("./components/weightLine"));

export default function WeightPage() {
  return (
    <div>
      <div className="h-full bg-white p-4">
        <PageInfoPortal extra={<WeightAlert />} />
        <div>
          <WeightLine />
          <WeightCalendar />
        </div>
      </div>
    </div>
  );
}
