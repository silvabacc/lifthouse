import { Space } from "antd";
import { PageAnimation } from "../aniamtions/pageAnimation";
import { pageConfig } from "./components/constants";
import NavigationCard from "./components/navCards";

export default function Lifthouse() {
  return (
    <PageAnimation>
      <Space direction="vertical">
        <h1 className="text-4xl font-bold">Time to grind 💪</h1>
        <h2 className="text-2xl font-bold">Go to...</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          {pageConfig.map((config) => (
            <NavigationCard key={config.route} config={config} />
          ))}
        </div>
      </Space>
    </PageAnimation>
  );
}
