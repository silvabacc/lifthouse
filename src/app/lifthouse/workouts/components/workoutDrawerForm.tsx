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
    <Drawer open={open} onClose={onClose} title={title}>
      <Form onFinish={onFinish}>
        <Form.Item name="name">
          <Input
            defaultValue={defaultTitleFieldValue}
            required={options.nameRequired}
            size="large"
            placeholder="Edit plan name"
          />
        </Form.Item>
        <Form.Item name="description">
          <TextArea
            defaultValue={defaultDescriptionFieldValue}
            showCount
            required={options.descriptionRequired}
            maxLength={100}
            placeholder="Edit description"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Space className="w-full justify-end">
          <Form.Item>
            <Button onClick={onClose}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              {isLoading ? "Saving" : "Ok"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  );
}
