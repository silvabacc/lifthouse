import { useEffect, useRef, useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { BottomFadeInAnimation } from "@/app/aniamtions/bottomFadeInAnimation";
import { WarningOutlined } from "@ant-design/icons";
import SearchElement from "@/app/lifthouse/components/search";

const WARNING_COLOR = "text-orange-600";

type DisabledOptions = {
  disabled: boolean;
  message?: string;
};

export type Options = {
  label: string;
  value: string | number;
  filterItemKey?: string;
  disabledOptions?: DisabledOptions;
};

type SelectProps = {
  value?: string | number;
  options: Options[];
  defaultValue?: string | number;
  filterTagsOptions?: string[];
  onChange?: (value: string | number) => void;
};
const DROPDOWN_HEIGHT = 256;

export default function SelectElement({
  value,
  options,
  defaultValue,
  filterTagsOptions = [],
  onChange,
}: SelectProps) {
  const [expanded, setExpnaded] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const findOption = (value?: string | number) =>
    options.find((o) => o?.value === value);

  //This may cause bugs...
  const [optionSelected, setOptionSelected] = useState(
    (findOption(defaultValue) || findOption(value)) ?? options[0],
  );

  const filteredOptions = options
    .filter((o) => o.label.toLocaleLowerCase().includes(search))
    .filter((exercise) =>
      tags.length ? tags.includes(exercise.filterItemKey ?? "") : true,
    );

  const onClick = () => {
    if (!expanded && ref.current) {
      const { bottom } = ref.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - bottom;
      setOpenUpward(spaceBelow < DROPDOWN_HEIGHT);
    }
    setExpnaded(!expanded);
  };

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

  const onOptionSelect = (o: Options) => {
    if (o.disabledOptions?.disabled) {
      return;
    }

    if (optionSelected.value === o.value) {
      setExpnaded(false);
      return;
    }
    setOptionSelected(o);
    setSearch("");
    setExpnaded(false);
    onChange?.(o.value);
  };

  return (
    <div className="relative" ref={ref}>
      <div
        className="flex items-center cursor-pointer justify-between p-2"
        onClick={onClick}
      >
        <span className="pr-2">
          {findOption(value)?.label ?? optionSelected?.label}
        </span>
        <DownOutlined />
      </div>
      {expanded && (
        <BottomFadeInAnimation
          animationDuration={0.1}
          animationHeight={DROPDOWN_HEIGHT}
          className={`absolute z-10 bg-white border-solid border-slate-200 overflow-auto w-full shadow-2xl rounded-lg flex flex-col ${
            openUpward ? "bottom-full" : "top-full mt-1 pb-4"
          }`}
        >
          {!openUpward && (
            <div className="bg-white sticky top-0 order-1">
              <SearchElement
                selectedTags={tags}
                filterTagOptions={filterTagsOptions}
                setSearchQuery={setSearch}
                setSelectedTags={setTags}
              />
            </div>
          )}
          <div className="h-full order-2">
            {filteredOptions.length === 0 && (
              <div className="h-full flex items-center justify-center text-lg text-center text-slate-400">
                No results found 😢
              </div>
            )}
            {filteredOptions.map((o, index) => {
              const showDisabled =
                o.disabledOptions?.disabled && o.value !== optionSelected.value;

              return (
                <div
                  className={`p-2 ${
                    showDisabled && "bg-orange-100"
                  } cursor-pointer hover:bg-slate-100 ${
                    o.value === optionSelected.value && "bg-slate-100"
                  }`}
                  key={`${index}_${o.value}`}
                >
                  <div className={`flex justify-between`}>
                    <span className="w-full" onClick={() => onOptionSelect(o)}>
                      {o.label}
                    </span>
                    {showDisabled && (
                      <Tooltip
                        trigger={"click"}
                        title={o.disabledOptions?.message}
                      >
                        <WarningOutlined className={`pr-2 ${WARNING_COLOR}`} />
                      </Tooltip>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {openUpward && (
            <div className="bg-white sticky bottom-0 order-3">
              <SearchElement
                selectedTags={tags}
                filterTagOptions={filterTagsOptions}
                setSearchQuery={setSearch}
                setSelectedTags={setTags}
              />
            </div>
          )}
        </BottomFadeInAnimation>
      )}
    </div>
  );
}
