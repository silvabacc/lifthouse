import { Divider } from "antd";
import WeightCalendar from "./components/weightCalendar";
import WeightAlert from "./components/weightAlert";
import PageInfo, { PageInfoPortal } from "../components/pageInfo";
import dynamic from "next/dynamic";

const WeightLine = dynamic(() => import("./components/weightLine"));

export default function WeightPage() {
  return (
    <div>
      <div className="h-full bg-white p-4">
        <PageInfoPortal>
          <WeightAlert />
        </PageInfoPortal>
        <div>
          <WeightLine />
          <WeightCalendar />
        </div>
      </div>
    </div>
  );
}
