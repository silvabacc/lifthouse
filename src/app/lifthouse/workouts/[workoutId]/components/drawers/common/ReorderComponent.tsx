import { Space } from "antd";
import { Reorder } from "framer-motion";

type Props<T> = {
  children: React.ReactNode;
  values: T[];
  onReorder: (values: T[]) => void;
};
export default function ReorderComponent<T>({
  children,
  values,
  onReorder,
}: Props<T>) {
  return (
    <Reorder.Group
      className="p-0"
      axis="y"
      values={values}
      onReorder={onReorder}
    >
      <Space size="large" className="w-full" direction="vertical">
        {children}
      </Space>
    </Reorder.Group>
  );
}
