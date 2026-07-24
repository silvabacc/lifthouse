import { Timeline, Typography } from "antd";

const { Text } = Typography;

export default function TemplateInfo() {
  const timelineUpperLower = [
    { title: "Monday", content: "Upper Body (High Intensity)" },
    { title: "Tuesday", content: "Lower Body (High Volume)" },
    { title: "Wednesday", content: "Rest" },
    { title: "Thursday", content: "Upper Body (High Volume)" },
    { title: "Friday", content: "Lower Body (High Intensity)" },
    { title: "Saturday", content: "Rest" },
    { title: "Sunday", content: "Rest" },
  ];

  const timelinePushPullLegs = [
    { title: "Monday", content: "Push" },
    { title: "Tuesday", content: "Pull" },
    { title: "Wednesday", content: "Legs" },
    { title: "Thursday", content: "Rest" },
    { title: "Friday", content: "Push" },
    { title: "Saturday", content: "Pull" },
    { title: "Sunday", content: "Legs" },
  ];

  return (
    <div>
      <h1>Template Info</h1>
      <Text className="text-gray-600">
        With templates, you can easily create or apply pre-configured workout
        plans to suit with your goals. Each template will have its own sets of
        exercise, sets and rep schemes, which you can adjust. <br />
        <br />
        The template will give you options on what exercises to do and how many
        sets and reps to do.
      </Text>
      <h3>Upper and Lower Body</h3>
      <Text className="text-gray-600">
        These templates are designed to target the upper and lower body and
        ideally used in a 4 day split program.
      </Text>
      <br />
      <br />
      <Text className="text-gray-600">
        You should set each workout with alternating days of high intensity and
        high volume to recieve the benefits of building strength as well as
        muscle.
      </Text>
      <h4>Weekly Split</h4>
      <Timeline mode="end" items={timelineUpperLower} />
      <h3>Push Pull Legs</h3>
      <Text className="text-gray-600">
        These templates are designed to target the pushing, pulling and leg
        movements and ideally used in a 6 day split program, but it is extremely
        flexible. You can do P-P-L-P-P or P-L-P-P-L or any other combination.
      </Text>
      <h4>Weekly Split</h4>
      <Timeline mode="end" items={timelinePushPullLegs} />
      <h3>Custom</h3>
      <Text className="text-gray-600">
        Create your own custom workout with your own chosen exercises and rep
        schemes.
      </Text>
    </div>
  );
}
