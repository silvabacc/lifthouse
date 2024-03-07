import { Button, Collapse, Form, InputNumber, Table } from "antd";
import { useEffect, useRef, useState } from "react";

export default function Calculator() {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [showTable, setShowTable] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      setShowTable(false);
      setWeight(0);
      setReps(0);
    };
  }, []);

  const onCalculcate = () => {
    if (weight && reps) {
      setShowTable(true);
    } else {
      setShowTable(false);
    }
    tableRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const columns = [
    {
      id: "percentage",
      dataIndex: "percentage",
      title: "Percentage",
    },
    { id: "weight", dataIndex: "weight", title: "Weight" },
  ];

  const percentages = Array.from(
    { length: Math.ceil((100 - 45) / 5) },
    (_, i) => 100 - i * 5
  );

  const data = percentages.map((percentage) => {
    const second = 0.0278 * reps;
    const calc = (weight / (1.0278 - second)) * percentage;
    return {
      key: percentage,
      percentage: `${percentage}%`,
      weight: `${(calc / 100).toFixed(2)} kg`,
    };
  });

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
              <div className="w-full">
                <Form.Item
                  label={
                    <span className="font-bold mr-4 w-16">{item.title}</span>
                  }
                  name={item.title.toLowerCase()}
                >
                  <InputNumber
                    required
                    onChange={(value) => {
                      setShowTable(false);
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
        <div ref={tableRef}>
          <Table
            pagination={false}
            className={`${showTable ? "visible" : "invisible h-0"} mt-4`}
            columns={columns}
            bordered={false}
            dataSource={data}
          />
        </div>
      </Collapse.Panel>
    </Collapse>
  );
}
