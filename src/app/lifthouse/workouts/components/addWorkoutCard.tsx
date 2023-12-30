import { useAppContext } from "@/app/context";
import getConfig from "@/config";
import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useWorkout } from "../useWorkout";
import { Workout } from "@/lib/supabase/db/types";

const { TextArea } = Input;

const { baseUrl } = getConfig();

type FieldType = {
  name: string;
  description: string;
};

export default function AddWorkoutCard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();

  const onFinish = async (info: FieldType) => {
    const response = await fetch(`${baseUrl}/api/workout/create`, {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
        name: info.name,
        description: info.description,
      }),
    });

    const workout = ((await response.json()) as Workout[])[0];

    setModalOpen(false);
    router.push(`/lifthouse/workouts/${workout.workoutId}`);
  };

  return (
    <>
      <div
        className="border-dotted border-2 border-sky-400 bg-white flex items-center cursor-pointer"
        onClick={() => setModalOpen(true)}
      >
        <Button
          type="link"
          className="flex text-sky-400 text-base w-full flex-col items-center justify-center"
        >
          + Add Workout Plan
        </Button>
      </div>
      <Modal
        title="Create a new workout plan"
        centered
        onCancel={() => setModalOpen(false)}
        open={modalOpen}
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
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Ok
              </Button>
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </>
  );
}
