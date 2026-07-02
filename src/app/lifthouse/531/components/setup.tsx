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
      const response: FiveThreeOne = await updateFiveThreeOnePersonalBests(values);
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
        <h1 className="m-0 mb-2">1RM (one rep max) for SBD</h1>
        <span>
          Enter your 1 rep max. You don&apos;t have to be accurate and be
          realistic, you don&apos;t have to train at your one rep max for this
          program to be effective
        </span>
        <Form form={form} className="mt-4" onFinish={onFinish}>
          {formItems.map((lift) => (
            <div key={lift.exercise.name} className="flex items-center">
              <div className="w-full">
                <span className="text-left font-bold">
                  {lift.exercise.name}
                </span>
                <Form.Item name={lift.key} colon={false}>
                  <InputNumber
                    placeholder={lift.pb.toString()}
                    required
                    className="w-full mt-4"
                    suffix="kg"
                  />
                </Form.Item>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Button type="primary" className="w-64" htmlType="submit" loading={isPending}>
              {isPending ? "Saving..." : "Finish"}
            </Button>
          </div>
        </Form>
      </Card>
      <Calculator />
    </div>
  );
}
