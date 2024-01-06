import { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";

const { Search } = Input;

type SelectProps = {
  options: { label: string; value: string | number }[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
};
export default function SelectElement({
  options,
  defaultValue,
  onChange,
}: SelectProps) {
  const [expanded, setExpnaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const findOption = (value?: string | number) =>
    options.find((o) => o.value === value);

  const [optionSelected, setOptionSelected] = useState(
    findOption(defaultValue) ?? options[0]
  );

  const onClick = () => setExpnaded(!expanded);

  const handleOutsideClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as Node)) {
      setExpnaded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center cursor-pointer justify-between border border-slate-200 p-1 rounded-lg"
        onClick={onClick}
      >
        <p className="pr-2">{optionSelected.label}</p>
        <DownOutlined />
      </div>
      {expanded && (
        <div className="absolute z-10 bg-white border border-slate-200 overflow-auto max-h-64 w-64">
          <div className="bg-white sticky top-0">
            <Search onChange={(e) => setSearch(e.target.value.toLowerCase())} />
          </div>
          {options
            .filter((o) => o.label.toLocaleLowerCase().includes(search))
            .map((o) => {
              return (
                <div
                  onClick={() => {
                    if (optionSelected.value === o.value) {
                      setExpnaded(false);
                      return;
                    }
                    setOptionSelected(o);
                    setSearch("");
                    setExpnaded(false);
                    onChange?.(o.value);
                  }}
                  className="p-1 cursor-pointer hover:bg-slate-100"
                  key={o.value}
                >
                  {o.label}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
