import { Timeline, Typography } from "antd";

const { Text } = Typography;

export default function TemplateInfo() {
  const timelineUpperLower = [
    { label: "Monday", children: "Upper Body (High Intensity)" },
    { label: "Tuesday", children: "Lower Body (High Volume)" },
    { label: "Wednesday", children: "Rest" },
    { label: "Thursday", children: "Upper Body (High Volume)" },
    { label: "Friday", children: "Lower Body (High Intensity)" },
    { label: "Saturday", children: "Rest" },
    { label: "Sunday", children: "Rest" },
  ];

  const timelinePushPullLegs = [
    { label: "Monday", children: "Push" },
    { label: "Tuesday", children: "Pull" },
    { label: "Wednesday", children: "Legs" },
    { label: "Thursday", children: "Rest" },
    { label: "Friday", children: "Push" },
    { label: "Saturday", children: "Pull" },
    { label: "Sunday", children: "Legs" },
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
      <Timeline mode="right" items={timelineUpperLower} />
      <h3>Push Pull Legs</h3>
      <Text className="text-gray-600">
        These templates are designed to target the pushing, pulling and leg
        movements and ideally used in a 6 day split program, but it is extremely
        flexible. You can do P-P-L-P-P or P-L-P-P-L or any other combination.
      </Text>
      <h4>Weekly Split</h4>
      <Timeline mode="right" items={timelinePushPullLegs} />
      <h3>Custom</h3>
      <Text className="text-gray-600">
        Create your own custom workout with your own chosen exercises and rep
        schemes.
      </Text>
    </div>
  );
}
