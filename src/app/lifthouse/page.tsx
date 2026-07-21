import { pageConfig } from "./components/constants";
import NavigationCard from "./components/navCards";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Lifthouse() {
  return (
    <div>
      <div className="pb-6">
        <h1 className="m-0 text-2xl font-bold">{getGreeting()} 💪</h1>
        <p className="m-0 mt-1 text-base text-gray-500">
          What are we training today?
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {pageConfig.map((config) => (
          <NavigationCard key={config.route} config={config} />
        ))}
      </div>
    </div>
  );
}
