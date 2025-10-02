"use client";

import { InputNumber, Button, Card, Form, Skeleton } from "antd";
import Calculator from "../calculator";
import { useFetch } from "../../../../../hooks/useFetch";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { useFiveThreeOneContext } from "../context";
import { useEffect, useState } from "react";
import { getFiveThreeOneData } from "../actions";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
  ohp: number;
};

export function Setup() {
  const [fiveThreeOneInfo, setFiveThreeOneInfo] = useState<FiveThreeOne>();
  const [loading, setLoading] = useState(false);
  // const onFinish = async (values: FieldType) => {
  //   const response: FiveThreeOne = await fetch("/api/531", {
  //     method: "POST",
  //     body: JSON.stringify(values),
  //   });
  //   setFiveThreeOneInfo(response);
  // };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getFiveThreeOneData();
      setFiveThreeOneInfo(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  const formItems = [
    {
      pb: fiveThreeOneInfo?.bench.pb,
      exercise: fiveThreeOneInfo?.bench.exercise,
      key: "bench",
    },
    {
      pb: fiveThreeOneInfo?.squat.pb,
      exercise: fiveThreeOneInfo?.squat.exercise,
      key: "squat",
    },
    {
      pb: fiveThreeOneInfo?.deadlift.pb,
      exercise: fiveThreeOneInfo?.deadlift.exercise,
      key: "deadlift",
    },
    {
      pb: fiveThreeOneInfo?.ohp.pb,
      exercise: fiveThreeOneInfo?.ohp.exercise,
      key: "ohp",
    },
  ];

  if (loading) {
    return <Skeleton />;
  }

  return (
    <div className="overflow-hidden grid lg:grid-cols-2 gap-4 items-start">
      <Card>
        <h1 className="text-2xl font-bold m-0 mb-2">
          1RM (one rep max) for SBD
        </h1>
        <span>
          Enter your 1 rep max. You don&apos;t have to be accurate and be
          realistic, you don&apos;t have to train at your one rep max for this
          program to be effective
        </span>
        {/* Finish onFinish for Form */}
        <Form className="mt-4">
          {formItems.map((lift) => (
            <div key={lift.exercise?.name} className="flex items-center">
              <div className="w-full">
                <span className="text-left font-bold">
                  {lift.exercise?.name}
                </span>
                <Form.Item name={lift.key} colon={false}>
                  <InputNumber
                    placeholder={lift.pb?.toString()}
                    required
                    className="w-full mt-4"
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
