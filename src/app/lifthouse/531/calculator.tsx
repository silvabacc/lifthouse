import { Button, Collapse, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";

type FieldType = {
  weight: number;
  reps: number;
};

export default function Calculator() {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [calculate, setCalculate] = useState(false);

  const onCalculcate = () => {
    if (weight && reps) {
      setCalculate(true);
    } else {
      setCalculate(false);
    }
  };

  return (
    <Collapse className="my-2">
      <Collapse.Panel
        header={<span className="font-bold m-0 mb-2">1RM calculator</span>}
        key="1"
      >
        <span>
          Using the Brzycki formula, we can estimate your maximum load for a
          weight training exercise. All you need to input is your best weight
          and reps performed for the exercise
        </span>
        <Form>
          {[
            { title: "Weight", setter: setWeight },
            { title: "Reps", setter: setReps },
          ].map((item) => (
            <div key={item.title} className="flex items-center mt-4">
              <span className="font-bold mr-4 w-16">{item.title}</span>
              <div className="w-full">
                <Form.Item name={item.title.toLowerCase()}>
                  <InputNumber
                    required
                    onChange={(value) => {
                      setCalculate(false);
                      item.setter(value as number);
                    }}
                    className="w-full"
                    suffix="kg"
                  />
                </Form.Item>
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              className="w-64"
              onClick={onCalculcate}
              htmlType="submit"
            >
              Calculate
            </Button>
          </div>
        </Form>
        {calculate && (
          <>
            {weight} {reps}
          </>
        )}
      </Collapse.Panel>
    </Collapse>
  );
}
