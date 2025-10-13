"use client";

import { InputNumber, Button, Card, Form, Skeleton } from "antd";
import Calculator from "../calculator";
import { FiveThreeOne } from "@/lib/supabase/db/types";
import { setFiveThreeOne } from "../actions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

type FieldType = {
  bench: number;
  squat: number;
  deadlift: number;
  ohp: number;
};

type SetupProps = {
  onFinish?: () => void;
};
export function Setup({ onFinish }: SetupProps) {
  const { data, isLoading } = useQuery({
    queryKey: ["531Data"],
    queryFn: fetchFiveThreeOneData,
  });
  const router = useRouter();

  const onFinishForm = async (values: FieldType) => {
    await setFiveThreeOne(values);
    router.refresh();
    onFinish();
  };

  const formItems = [
    {
      pb: data?.bench.pb,
      exercise: data?.bench.exercise,
      key: "bench",
    },
    {
      pb: data?.squat.pb,
      exercise: data?.squat.exercise,
      key: "squat",
    },
    {
      pb: data?.deadlift.pb,
      exercise: data?.deadlift.exercise,
      key: "deadlift",
    },
    {
      pb: data?.ohp.pb,
      exercise: data?.ohp.exercise,
      key: "ohp",
    },
  ];

  if (isLoading) {
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
        <Form className="mt-4" onFinish={onFinishForm}>
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

const fetchFiveThreeOneData = async () => {
  return (await axios.get<FiveThreeOne>("/api/531")).data;
};
