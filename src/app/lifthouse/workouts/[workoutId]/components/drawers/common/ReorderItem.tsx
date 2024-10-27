import { MenuOutlined } from "@ant-design/icons";
import { Space } from "antd";
import { Reorder } from "framer-motion";

type Props<T> = {
  children: React.ReactNode;
  key: string;
  item: T;
  draggable: boolean;
  extra?: React.ReactNode;
  onDragEnd: (value: boolean) => void;
};
export default function ReorderItem<T>({
  children,
  item,
  key,
  draggable,
  onDragEnd,
}: Props<T>) {
  return (
    <Reorder.Item
      className="p-2 shadow rounded flex justify-between items-center w-full bg-white"
      key={key}
      value={item}
      dragListener={draggable}
      onDragEnd={() => onDragEnd(false)}
    >
      <Space direction="vertical" className="w-full">
        {children}
      </Space>
      <MenuOutlined
        onMouseEnter={() => onDragEnd(true)}
        onMouseLeave={() => onDragEnd(false)}
        onTouchStart={() => onDragEnd(true)}
        className="m-4"
      />
    </Reorder.Item>
  );
}
