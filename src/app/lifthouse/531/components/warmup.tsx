import { PersonalBest } from "@/lib/supabase/db/types";
import { Table } from "antd";

type Props = {
  selectedExercise: PersonalBest;
};
export default function Warmup({ selectedExercise }: Props) {
  const columns = [
    {
      title: "Reps",
      dataIndex: "reps",
      key: "reps",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
  ];

  const data = [
    {
      reps: "10",
      weight: "empty bar",
    },
    {
      reps: "5",
      weight: (selectedExercise.pb * 0.4).toFixed(0),
    },
    {
      reps: "5",
      weight: (selectedExercise.pb * 0.5).toFixed(0),
    },
  ];
  return <Table columns={columns} dataSource={data} pagination={false} />;
}
