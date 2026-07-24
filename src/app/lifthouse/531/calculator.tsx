import { Alert, Button, Card, Form, InputNumber } from "antd";
import { useEffect, useState } from "react";

const HIGHLIGHT_PERCENTAGES = [90];

type Result = { percentage: number; weight: string };

function calculatePercentages(weight: number, reps: number): Result[] {
  const percentages = Array.from(
    { length: (100 - 45) / 5 + 1 },
    (_, i) => 100 - i * 5,
  );

  return percentages.map((percentage) => {
    const second = 0.0278 * reps;
    const calc = (weight / (1.0278 - second)) * percentage;
    return {
      percentage,
      weight: (calc / 100).toFixed(2),
    };
  });
}

export default function Calculator() {
  const [weight, setWeight] = useState<number>(0);
  const [reps, setReps] = useState<number>(0);
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<Result[]>([]);

  useEffect(() => {
    return () => {
      setShowResults(false);
      setWeight(0);
      setReps(0);
    };
  }, []);

  const onCalculcate = () => {
    if (weight && reps) {
      setResult(calculatePercentages(weight, reps));
      setShowResults(true);
    }
  };

  const inputs = [
    { title: "Weight", value: weight, setter: setWeight, suffix: "kg" },
    { title: "Reps", value: reps, setter: setReps, suffix: undefined },
  ];

  return (
    <Card>
      <h1 className="font-bold m-0 mb-2">1RM calculator</h1>
      {showResults ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-end gap-2">
            {inputs.map((item) => (
              <div key={item.title} className="flex-1">
                <span className="text-xs font-bold">{item.title}</span>
                <InputNumber
                  style={{ width: "100%" }}
                  value={item.value}
                  onChange={(value) => item.setter((value as number) ?? 0)}
                  className="w-full mt-1"
                  suffix={item.suffix}
                />
              </div>
            ))}
            <Button type="primary" onClick={onCalculcate}>
              Calculate
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-1 mt-4">
            {result.map(({ percentage, weight }) => (
              <div
                key={percentage}
                className={`rounded-lg p-2 text-center ${
                  HIGHLIGHT_PERCENTAGES.includes(percentage)
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-gray-50 text-gray-500"
                }`}
              >
                <div className="text-xs font-semibold">{percentage}%</div>
                <div className="text-[11px]">{weight} kg</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 items-start">
          <div className="flex flex-col gap-2 w-full">
            <span>
              Using the Brzycki formula, we can estimate your maximum load for a
              weight training exercise. All you need to input is your best
              weight and reps performed for the exercise
            </span>
            <Alert
              showIcon
              title={<span className="text-sm">References</span>}
              description={
                <span className="text-xs">
                  BRZYCKI, M. (1993) Strength testing-Predicting a one-rep max
                  from reps-to-fatigue. JOPERD, 68, p. 88-90
                </span>
              }
              type="info"
            />
          </div>
          <Form>
            {inputs.map((item) => (
              <div key={item.title} className="flex items-center mt-4">
                <div className="w-full">
                  <span className="font-bold mr-4 w-16">{item.title}</span>
                  <Form.Item name={item.title.toLowerCase()}>
                    <InputNumber
                      style={{ width: "100%" }}
                      required
                      onChange={(value) => item.setter((value as number) ?? 0)}
                      className="w-full mt-4"
                      suffix={item.suffix}
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
        </div>
      )}
    </Card>
  );
}
