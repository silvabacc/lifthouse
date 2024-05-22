import { useAppContext } from "@/app/context";
import { Steps } from "intro.js-react";

export default function WorkoutTutorial() {
  const { enableTutorial } = useAppContext();

  const steps = [
    {
      intro: <WelcomeToLiftHouse />,
    },
  ];

  return (
    <Steps
      enabled={enableTutorial}
      steps={steps}
      initialStep={0}
      onExit={() => {}}
    />
  );
}

function WelcomeToLiftHouse() {
  return (
    <div>
      <h1>Welcome to LiftHouse!</h1>
      <p>LiftHouse is a </p>
    </div>
  );
}
