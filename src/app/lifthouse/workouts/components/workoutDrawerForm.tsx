import { Button, Drawer, Form, Input, Space } from "antd";
import { useState } from "react";

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
  onClose: (modalOpen: boolean) => void;
  onFinish: (info: ExerciseFormDrawerField) => Promise<void>;
  options?: Options;
};

export default function WorkoutFormDrawer({
  title,
  open,
  onClose,
  onFinish,
  options = { nameRequired: true, descriptionRequired: false },
}: Props) {
  const [disable, setDisable] = useState(false);

  const onSubmit = async (info: ExerciseFormDrawerField) => {
    setDisable(true);
    await onFinish(info);
    setDisable(false);
  };

  return (
    <Drawer open={open} onClose={() => onClose(false)} title={title}>
      <Form onFinish={onSubmit}>
        <Form.Item name="name">
          <Input
            required={options.nameRequired}
            size="large"
            placeholder="Edit plan name"
          />
        </Form.Item>
        <Form.Item name="description">
          <TextArea
            showCount
            required={options.descriptionRequired}
            maxLength={100}
            placeholder="Edit description"
            style={{ height: 120, resize: "none" }}
          />
        </Form.Item>
        <Space className=" w-full justify-end">
          <Form.Item>
            <Button onClick={() => onClose(false)}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {disable ? "Saving" : "Ok"}
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Drawer>
  );
}
