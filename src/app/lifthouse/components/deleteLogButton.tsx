import { DeleteOutlined } from "@ant-design/icons";
import { Button } from "antd";

type Props = {
  onDelete: () => void;
};
export default function DeleteLogButton({ onDelete }: Props) {
  const onClick = async () => {
    onDelete();
  };

  return (
    <Button
      className="ml-2"
      onClick={onClick}
      danger
      icon={<DeleteOutlined className="text-rose-700" />}
    />
  );
}
