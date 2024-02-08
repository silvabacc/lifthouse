import {
  BarChartOutlined,
  LineChartOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { View } from "../../charts";

type ButtonIconProps = {
  view: View;
};
export default function ButtonIcon({ view }: ButtonIconProps) {
  const style = "text-xl";
  switch (view) {
    case View.table:
      return <TableOutlined className={style} />;
    case View.line:
      return <LineChartOutlined className={style} />;
    case View.stacked:
      return <BarChartOutlined className={style} />;
  }
}
