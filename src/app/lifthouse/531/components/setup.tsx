import { Drawer, InputNumber, Button, Card, Space, Form } from "antd";
import Calculator from "../calculator";
import { useFetch } from "@/app/hooks/useFetch";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { useEffect } from "react";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
};

type Props = {
  pbs: {
    bench: { weight: number; setter: (value: number) => void };
    squat: { weight: number; setter: (value: number) => void };
    deadlift: { weight: number; setter: (value: number) => void };
  };
  open: boolean;
  onClose: () => void;
};
export function Setup({ pbs, open, onClose }: Props) {
  const { fetch } = useFetch();

  const onFinish = async (values: FieldType) => {
    const response: FiveThreeOne = await fetch("/api/531", {
      method: "POST",
      body: JSON.stringify(values),
    });
    pbs.bench.setter(response.bench);
    pbs.squat.setter(response.squat);
    pbs.deadlift.setter(response.deadlift);
    onClose();
  };

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
          {[
            { title: "Bench", value: pbs.bench.weight },
            { title: "Squat", value: pbs.squat.weight },
            { title: "Deadlift", value: pbs.deadlift.weight },
          ].map((lift) => (
            <div key={lift.title} className="flex items-center ">
              <div className="w-full">
                <Form.Item
                  name={lift.title.toLocaleLowerCase()}
                  colon={false}
                  label={
                    <span className="text-left font-bold mr-4 w-16">
                      {lift.title}
                    </span>
                  }
                >
                  <InputNumber
                    defaultValue={lift.value}
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
