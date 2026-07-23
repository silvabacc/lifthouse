import { InputNumber, Button, Card, Form } from "antd";
import Calculator from "../calculator";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { useFiveThreeOneContext } from "../context";
import { updateFiveThreeOnePersonalBests } from "../actions";
import { useTransition } from "react";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
  ohp: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};
export function Setup({ open, onClose }: Props) {
  const { fiveThreeOneInfo, setFiveThreeOneInfo } = useFiveThreeOneContext();
  const [isPending, startTransition] = useTransition();
  const [form] = Form.useForm<FieldType>();

  const onFinish = (values: FieldType) => {
    startTransition(async () => {
      const response: FiveThreeOne =
        await updateFiveThreeOnePersonalBests(values);
      form.resetFields();
      setFiveThreeOneInfo(response);
      onClose();
    });
  };

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;
  const formItems = [
    {
      pb: bench.pb,
      exercise: bench.exercise,
      key: "bench",
    },
    {
      pb: squat.pb,
      exercise: squat.exercise,
      key: "squat",
    },
    {
      pb: deadlift.pb,
      exercise: deadlift.exercise,
      key: "deadlift",
    },
    {
      pb: ohp.pb,
      exercise: ohp.exercise,
      key: "ohp",
    },
  ];

  return (
    <div className="overflow-hidden grid lg:grid-cols-2 gap-4 items-start">
      <Card>
        <h2 className="m-0 mb-2 text-lg font-semibold">One-rep maxes</h2>
        <span className="text-gray-500">
          Enter your one-rep max for each lift. A realistic estimate is fine —
          you won&apos;t train at your max for this program to be effective.
        </span>
        <Form
          form={form}
          layout="vertical"
          className="mt-4"
          onFinish={onFinish}
        >
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
            {formItems.map((lift) => (
              <Form.Item
                key={lift.exercise.name}
                name={lift.key}
                label={
                  <span className="block truncate" title={lift.exercise.name}>
                    {lift.exercise.name}
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: `Enter your ${lift.exercise.name} one-rep max`,
                  },
                ]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  placeholder={lift.pb.toString()}
                  inputMode="decimal"
                  min={1}
                  className="w-full"
                  suffix="kg"
                />
              </Form.Item>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              className="w-64"
              htmlType="submit"
              loading={isPending}
            >
              {isPending ? "Saving" : "Save"}
            </Button>
          </div>
        </Form>
      </Card>
      <Calculator />
    </div>
  );
}
