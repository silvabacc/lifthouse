import { InputNumber, Button, Card, Space, Form } from "antd";
import Calculator from "../calculator";
import { useFetch } from "@/app/hooks/useFetch";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { useFiveThreeOneContext } from "../context";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
};
export function Setup({ open, onClose }: Props) {
  const { fiveThreeOneInfo, setFiveThreeOneInfo } = useFiveThreeOneContext();
  const { fetch } = useFetch();

  const onFinish = async (values: FieldType) => {
    const response: FiveThreeOne = await fetch("/api/531", {
      method: "POST",
      body: JSON.stringify(values),
    });
    setFiveThreeOneInfo(response);
    onClose();
  };

  const { bench, squat, deadlift, ohp } = fiveThreeOneInfo;

  return (
    <div>
      <Card>
        <h1 className="m-0 mb-2">1RM (one rep max) for SBD</h1>
        <span>
          Enter your 1 rep max. You don&apos;t have to be accurate and be
          realistic, you don&apos;t have to train at your one rep max for this
          program to be effective
        </span>
        <Form className="mt-4" onFinish={onFinish}>
          {[bench, ohp, squat, deadlift].map((lift) => (
            <div key={lift.exercise.name} className="flex items-center ">
              <div className="w-full">
                <Form.Item
                  name={lift.exercise.name.toLocaleLowerCase()}
                  colon={false}
                  label={
                    <span className="text-left font-bold mr-4 w-16">
                      {lift.exercise.name}
                    </span>
                  }
                >
                  <InputNumber
                    defaultValue={lift.pb}
                    required
                    className="w-full"
                    suffix="kg"
                  />
                </Form.Item>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Button type="primary" className="w-64" htmlType="submit">
              Finish
            </Button>
          </div>
        </Form>
      </Card>
      <Calculator />
    </div>
  );
}
