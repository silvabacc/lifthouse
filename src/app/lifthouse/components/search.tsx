import { PrimaryMuscleGroup } from "@/lib/supabase/db/types";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Input, Tag } from "antd";
import { useState } from "react";

const { Search } = Input;
const { CheckableTag } = Tag;

type SearchExerciseProps = {
  selectedTags?: string[];
  filterTagOptions?: string[];
  setSelectedTags?: (tags: string[]) => void;
  setSearchQuery: (query: string) => void;
};
export default function SearchElement({
  selectedTags = [],
  filterTagOptions,
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
  console.log("🚀 ~ filterTagOptions:", filterTagOptions);
  console.log(
    "🚀 ~ filterTagOptions?.length === 0 :",
    filterTagOptions?.length === 0
  );

  console.log("🚀 ~ selectedTags.length:", selectedTags.length);
  console.log("🚀 ~ expandedFilter:", expandedFilter);
  console.log(
    "🚀 ~ selectedTags.length === 0 && !expandedFilter:",
    selectedTags.length === 0 && !expandedFilter
  );
  return (
    <>
      <div className="flex justify-between w-full pb-2">
        <Search
          className="w-full"
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
        {filterTagOptions?.length !== 0 && (
          <Button
            type={selectedTags.length === 0 ? "default" : "primary"}
            className="mx-1"
            onClick={() => setExpandedFilter((prev) => !prev)}
          >
            <FilterOutlined />
          </Button>
        )}
      </div>
      {expandedFilter && filterTagOptions && (
        <div className="flex pb-4 px-2 overflow-auto shadow ">
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
      )}
    </>
  );
}
