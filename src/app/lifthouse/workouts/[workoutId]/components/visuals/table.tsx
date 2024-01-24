import { LogEntry } from "@/lib/supabase/db/types";
import { Table as AntDTable, Button, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";

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
  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);

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
      { title: "Weight", dataIndex: "weight", key: "weight" },
      { title: "Reps", dataIndex: "reps", key: "rep" },
    ];

    return (
      <AntDTable
        pagination={false}
        columns={columns}
        dataSource={transformedData}
      />
    );
  };

  const transformedData = data
    .map((log) => ({
      key: log.logId,
      date: new Date(log.date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      notes: log.notes,
    }))
    .reverse();

  const columns: TableColumnsType<TableDataType> = [
    { title: "Date", dataIndex: "date", key: "date", width: 150 },
    { title: "Notes", dataIndex: "notes", key: "notes" },
  ];

  return (
    <div className="mt-4">
      <Button
        type="link"
        className="p-0 mb-4"
        onClick={() => {
          expandedKeys.length === data.length
            ? setExpandedKeys([])
            : setExpandedKeys(data.map((l) => l.logId));
        }}
      >
        {expandedKeys.length === data.length ? "Decollapse all" : "Expand All"}
      </Button>
      <AntDTable
        pagination={false}
        expandable={{
          expandedRowKeys: expandedKeys,
          onExpandedRowsChange: (expandedKeys) => {
            setExpandedKeys(expandedKeys as number[]);
          },
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
