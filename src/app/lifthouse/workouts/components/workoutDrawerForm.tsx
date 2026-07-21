"use client";

import { Button, Drawer, Form, Input, Space } from "antd";

const { TextArea } = Input;

export type ExerciseFormDrawerField = {
  name: string;
  description: string;
};

type Options = {
  nameRequired?: boolean;
  descriptionRequired?: boolean;
};

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  onFinish: (info: ExerciseFormDrawerField) => void;
  options?: Options;
  defaultTitleFieldValue?: string;
  defaultDescriptionFieldValue?: string;
  isLoading?: boolean;
};

export default function WorkoutFormDrawer({
  title,
  open,
  onClose,
  onFinish,
  options = { nameRequired: true, descriptionRequired: false },
  defaultTitleFieldValue,
  defaultDescriptionFieldValue,
  isLoading,
}: Props) {
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={title}
      width="min(420px, 100vw)"
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          name: defaultTitleFieldValue,
          description: defaultDescriptionFieldValue,
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[
            {
              required: options.nameRequired,
              message: "Give your workout plan a name",
            },
          ]}
        >
          <Input size="large" placeholder="e.g. Upper Body A" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[
            {
              required: options.descriptionRequired,
              message: "Add a short description",
            },
          ]}
        >
          <TextArea
            showCount
            maxLength={100}
            placeholder="e.g. Heavy pressing day — OHP focus"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Space className="w-full justify-end">
          <Form.Item>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Saving" : "Save"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  );
}
