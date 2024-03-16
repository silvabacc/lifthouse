import { LogEntry } from "@/lib/supabase/db/types";
import { Table as AntDTable, Button, Popconfirm, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { useFetch } from "@/app/hooks/useFetch";

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
  setLogs?: (logs: LogEntry[]) => void;
};
export default function Table({ data, setLogs }: Props) {
  const [expandedKeys, setExpandedKeys] = useState<number[]>([]);
  const [dataSource, setDataSource] = useState<TableDataType[]>([]);
  const { fetch } = useFetch();

  useEffect(() => {
    setDataSource(transformData(data));
  }, [data]);

  const handleDelete = async (key: React.Key) => {
    const response = await fetch(`/api/logs/${key}`, { method: "DELETE" });

    if (response.success) {
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
      setLogs && setLogs(data.filter((item) => item.logId !== key));
    }
  };

  const columns: TableColumnsType<TableDataType> = [
    { title: "Date", dataIndex: "date", key: "date", width: 150 },
    { title: "Notes", dataIndex: "notes", key: "notes" },
    {
      dataIndex: "delete",
      render: (_, record: { key: React.Key }) => (
        <Popconfirm
          title="Sure to delete?"
          onConfirm={() => handleDelete(record.key)}
        >
          <Button
            className="ml-2"
            danger
            icon={<DeleteOutlined className="text-rose-700" />}
          />
        </Popconfirm>
      ),
      width: 40,
    },
  ];

  return (
    <div className="mt-4">
      <Button
        type="link"
        className="p-0 mt-4"
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
            return expandedRowRender(data, parseInt(record.key.toString()));
          },
        }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
}

function expandedRowRender(data: LogEntry[], logId: number) {
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
}

function transformData(data: LogEntry[]) {
  return data
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
}
