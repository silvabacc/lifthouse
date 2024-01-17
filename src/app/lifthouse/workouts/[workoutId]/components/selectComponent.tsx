import { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";

const { Search } = Input;

type SelectProps = {
  value?: string | number;
  options: { label: string; value: string | number }[];
  defaultValue?: string | number;
  onChange?: (value: string | number) => void;
};
export default function SelectElement({
  value,
  options,
  defaultValue,
  onChange,
}: SelectProps) {
  const [expanded, setExpnaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");

  const findOption = (value?: string | number) =>
    options.find((o) => o?.value === value);

  //This may cause bugs...
  const [optionSelected, setOptionSelected] = useState(
    (findOption(defaultValue) || findOption(value)) ?? options[0]
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
        className="flex items-center cursor-pointer justify-between border border-slate-200 p-2 rounded-lg"
        onClick={onClick}
      >
        <p className="pr-2">
          {findOption(value)?.label ?? optionSelected?.label}
        </p>
        <DownOutlined />
      </div>
      {expanded && (
        <BottomFadeInAnimation
          animationDuration={0.1}
          animationHeight={256}
          className="absolute z-10 bg-white border border-slate-200 overflow-auto min-w-56 shadow-2xl"
        >
          <div className="bg-white sticky top-0">
            <Search onChange={(e) => setSearch(e.target.value.toLowerCase())} />
          </div>
          {options
            .filter((o) => o.label.toLocaleLowerCase().includes(search))
            .map((o, index) => {
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
                  className={`p-2 cursor-pointer hover:bg-slate-100 ${
                    o.value === optionSelected.value && "bg-slate-100"
                  }`}
                  key={`${index}_${o.value}`}
                >
                  {o.label}
                </div>
              );
            })}
        </BottomFadeInAnimation>
      )}
    </div>
  );
}
