import getConfig from "@/config";
import { Button, Drawer, Form, Input, Modal, Space } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkout } from "../useWorkout";
import { Workout } from "@/lib/supabase/db/types";
import AddButton from "./addButton";

const { TextArea } = Input;

type FieldType = {
  name: string;
  description: string;
};

type AddWorkoutCardProps = {
  setWorkouts: Dispatch<SetStateAction<Workout[]>>;
};

export default function AddWorkoutCard({ setWorkouts }: AddWorkoutCardProps) {
  const [drawOpen, setDrawOpen] = useState(false);
  const [disable, setDisabled] = useState(false);
  const { createWorkoutPlan } = useWorkout();
  const router = useRouter();

  const onFinish = async (info: FieldType) => {
    setDisabled(true);
    const response = await createWorkoutPlan(info.name, info.description);

    setWorkouts((prev) => [...prev, response]);
    setDrawOpen(false);
    setDisabled(false);
  };

  return (
    <>
      <AddButton title="+ Add Workout Plan" onClick={() => setDrawOpen(true)} />
      <Drawer
        title="Create a new workout plan"
        onClose={() => setDrawOpen(false)}
        open={drawOpen}
        width={500}
        footer={false}
      >
        <Form onFinish={onFinish}>
          <Form.Item name="name">
            <Input required size="large" placeholder="Workout plan name" />
          </Form.Item>
          <Form.Item name="description">
            <TextArea
              showCount
              maxLength={100}
              placeholder="Description"
              style={{ height: 120, resize: "none" }}
            />
          </Form.Item>
          <Space className=" w-full justify-end">
            <Form.Item>
              <Button onClick={() => setDrawOpen(false)}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {disable ? "Saving" : "Ok"}
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Drawer>
    </>
  );
}
