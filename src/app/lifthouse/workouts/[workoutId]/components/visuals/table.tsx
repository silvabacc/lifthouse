import { Exercise, LogEntry } from "@/lib/supabase/db/types";
import { Table as AntDTable, TableColumnsType } from "antd";
import React from "react";

const { Column, ColumnGroup } = AntDTable;

interface TableDataType {
  key: React.Key;
  date: string;
  notes: string;
}

interface ExpandedDataType {
  key: React.Key;
  set: number;
  reps: number;
  weight: number;
}

type Props = {
  data: LogEntry[];
};
export default function Table({ data }: Props) {
  const expandedRowRender = (logId: number) => {
    const row = data.find((l) => l.logId === logId);
    if (!row) {
      return <>No logs found</>;
    }

    const transformedData = row.info
      .sort((a, b) => a.set - b.set)
      .map((info) => ({
        key: `${logId}-${info.set}-${info.reps}-${info.weight}`,
        set: info.set,
        reps: info.reps,
        weight: info.weight,
      }));

    const columns: TableColumnsType<ExpandedDataType> = [
      { title: "Set", dataIndex: "set", key: "set" },
      { title: "Reps", dataIndex: "reps", key: "rep" },
      { title: "Weight", dataIndex: "weight", key: "weight" },
    ];

    return <AntDTable columns={columns} dataSource={transformedData} />;
  };

  const transformedData = data.map((log) => ({
    key: log.logId,
    date: new Date(log.date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    notes: log.notes,
  }));

  const columns: TableColumnsType<TableDataType> = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Notes", dataIndex: "notes", key: "notes" },
  ];

  return (
    <div className="mt-4">
      <AntDTable
        expandable={{
          expandedRowRender(record) {
            return expandedRowRender(parseInt(record.key.toString()));
          },
        }}
        columns={columns}
        dataSource={transformedData}
      />
    </div>
  );
}
