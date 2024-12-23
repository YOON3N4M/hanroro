import { ScheduleType } from "@/types";
import { cn } from "@/utils";
import { Dispatch, SetStateAction } from "react";
import { scheduleTypeColorStyles } from ".";

export interface Filter {
  type: ScheduleType;
  kor: string;
}

export const TYPE_FILTER: Filter[] = [
  { type: "concert", kor: "공연" },
  { type: "event", kor: "티켓팅/이벤트" },
  { type: "anniversary", kor: "기념일" },
  { type: "release", kor: "발매" },
  //   { type: "etc", kor: "기타" },
];

interface CalendarFilterProps {
  filterList: Filter[];
  setFilterList: Dispatch<SetStateAction<Filter[]>>;
}

export function CalendarFilter(props: CalendarFilterProps) {
  const { filterList, setFilterList } = props;

  function handleFilterClick(filterObj: Filter) {
    if (filterList.find((item) => item.type === filterObj.type)) {
      setFilterList((prev) =>
        prev.filter((item) => item.type !== filterObj.type)
      );
    } else {
      setFilterList((prev) => [...prev, filterObj]);
    }
  }
  return (
    <div className="mt-sm flex">
      <div className="flex gap-md">
        <span className="opacity-70">필터</span>
        {TYPE_FILTER.map((type) => (
          <button
            onClick={() => handleFilterClick(type)}
            key={type.type}
            className="flex items-center gap-xxs tab:text-xs"
          >
            <span
              className={cn(
                "size-[12px] border-2",
                scheduleTypeColorStyles[type.type].border,
                filterList.find((item) => item.type === type.type) &&
                  scheduleTypeColorStyles[type.type].default
              )}
            ></span>
            <span> {type.kor}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
