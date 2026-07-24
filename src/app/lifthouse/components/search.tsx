import { FilterOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Tag, type InputProps } from "antd";
import { useState } from "react";

const { CheckableTag } = Tag;

type Variant = InputProps["variant"];

type SearchExerciseProps = {
  selectedTags?: string[];
  filterTagOptions?: string[];
  variant?: Variant;
  placeHolder?: string;
  setSelectedTags?: (tags: string[]) => void;
  setSearchQuery: (query: string) => void;
};
export default function SearchElement({
  selectedTags = [],
  filterTagOptions,
  placeHolder,
  variant,
  setSearchQuery,
  setSelectedTags,
}: SearchExerciseProps) {
  const [expandedFilter, setExpandedFilter] = useState<boolean>();

  const handleChange = (tag: string, checked: boolean) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t !== tag);
    setSelectedTags?.(nextSelectedTags);
  };

  return (
    <>
      <div className="flex justify-between w-full">
        <Input
          variant={variant}
          className={`w-full ${variant === "underlined" && "mx-2 p-0"} `}
          placeholder={placeHolder}
          prefix={variant !== "underlined" && <SearchOutlined />}
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        {filterTagOptions?.length !== 0 && (
          <Button
            type={selectedTags.length === 0 ? "link" : "primary"}
            onClick={() => setExpandedFilter((prev) => !prev)}
          >
            <FilterOutlined />
          </Button>
        )}
      </div>
      {expandedFilter && filterTagOptions && (
        <>
          <div className="flex px-2 overflow-auto gap-2 mt-2 pb-3">
            {filterTagOptions.map((tag) => (
              <CheckableTag
                key={tag}
                checked={selectedTags?.includes(tag) ?? false}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {tag}
              </CheckableTag>
            ))}
          </div>
          <Divider style={{ margin: 2 }} />
        </>
      )}
    </>
  );
}
