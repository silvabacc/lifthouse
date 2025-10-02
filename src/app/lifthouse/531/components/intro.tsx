"use client";

import { Alert, Button, Card, Drawer, Flex, Skeleton, Space } from "antd";
import { Setup } from "./setup";
import { useFiveThreeOneContext } from "../context";
import PageInfoPortal from "../../components/pageInfo/portal";
import { useState } from "react";
import { FiveThreeOne } from "@/lib/supabase/db/types";

type IntroductionProps = {
  info: FiveThreeOne;
};
export default function Introduction({ info }: IntroductionProps) {
  const [setupOpen, setSetupOpen] = useState(false);

  const { bench, squat, deadlift, ohp } = info;

  const exercises = [bench, squat, deadlift, ohp];

  const hasValues = !bench.pb || !squat.pb || !deadlift.pb || !ohp.pb;

  return (
    <div>
      <PageInfoPortal
        extra={
          <span>
            <Button onClick={() => setSetupOpen(!hasValues && !setupOpen)}>
              Edit SBD personal bests
            </Button>
          </span>
        }
      />
      {!!hasValues && (
        <Flex vertical>
          <Space direction="vertical">
            <h1 className="text-4xl font-bold">Welcome to the 531 program</h1>
            <Alert
              className="mb-4"
              showIcon
              message="You need to setup your personal bests before you can start using this
          program"
            />
          </Space>
          <Setup />
        </Flex>
      )}

      <Drawer
        size="large"
        open={!hasValues && setupOpen}
        onClose={() => setSetupOpen(false)}
      >
        <Setup />
      </Drawer>
    </div>
  );
}
