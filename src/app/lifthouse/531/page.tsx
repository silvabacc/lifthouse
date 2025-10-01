import { PageAnimation } from "@/app/aniamtions/pageAnimation";
import { Button } from "antd";
import Introduction from "./components/intro";
import PageInfoPortal from "../components/pageInfo/portal";

export default function FiveThreeOnePage() {
  return (
    <PageAnimation>
      <Introduction />
      <PageInfoPortal
        extra={
          <span>
            <Button>Edit SBD personal bests</Button>
          </span>
        }
      />
      {/* <FiveThreeOne /> */}
    </PageAnimation>
  );
}
