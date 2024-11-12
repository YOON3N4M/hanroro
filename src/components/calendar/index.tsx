"use client";

import { format, startOfMonth } from "date-fns";
import useCalendar from "./useCalendar";
import { IconRightLeft, IconRightRight } from "../svg";
import { cn } from "@/utils";
import { Schedule, SCHEDULE_LIST, ScheduleType } from "@/data/schedule";
import useModal from "../modal/useModal";
import ScheduleViewModal from "../modal/form/ScheduleViewModal";
import { useState } from "react";

interface Filter {
  type: ScheduleType;
  kor: string;
}

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const TYPE_FILTER: Filter[] = [
  { type: "concert", kor: "공연" },
  { type: "event", kor: "이벤트" },
  { type: "anniversary", kor: "기념일" },
  //   { type: "release", kor: "발매" },
  //   { type: "etc", kor: "기타" },
];

export default function Calendar() {
  const { currentDate, daysOfMonth, nextMonth, prevMonth } = useCalendar();
  const [scheduleList, setSchduleList] = useState(SCHEDULE_LIST);
  const [filter, setFilter] = useState<Filter[]>(TYPE_FILTER);

  function onFilterClick(obj: Filter) {
    if (filter.find((item) => item.type === obj.type)) {
      setFilter((prev) => prev.filter((item) => item.type !== obj.type));
    } else {
      setFilter((prev) => [...prev, obj]);
    }
  }

  return (
    <>
      {/* left */}
      <div className="basis-[20%] flex flex-col pc:min-h-[500px] min-w-[300px] p-md max-w-[375px] border py-md bg-[#fafafc] mo:w-full mo:max-w-full">
        {/* calendar */}
        <div className="flex justify-center items-center gap-sm">
          <button onClick={prevMonth} aria-label="calendar prev month">
            <IconRightLeft />
          </button>
          <div className="flex justify-center flex-col items-center">
            <span className="text-xs"> {format(currentDate, "yyyy")}</span>
            <span className="text-xl font-bold">
              {format(currentDate, "MM")}
            </span>
          </div>
          <button onClick={nextMonth} aria-label="calendar next month">
            <IconRightRight />
          </button>
        </div>
        {/* filter */}
        <div className="bg-white border rounded-md mt-xl flex flex-col p-md">
          {TYPE_FILTER.map((obj) => (
            <button
              key={`${obj.type}-filter`}
              className={cn(
                "w-full flex items-center gap-sm hover:bg-gray-50 py-xs px-sm rounded-md"
              )}
              onClick={() => onFilterClick(obj)}
            >
              <span
                className={cn(
                  "aspect-[1/1] w-[15px] border-2",
                  scheduleTypeColorStyles[obj.type].border,
                  filter.find((item) => item.type === obj.type) &&
                    scheduleTypeColorStyles[obj.type].default
                )}
              ></span>
              <span>{obj.kor}</span>
            </button>
          ))}
        </div>
        <span className="mt-xl text-sm opacity-80">리스트</span>
        <div className="bg-white border rounded-md flex flex-col mt-xs gap-sm p-md flex-1">
          {scheduleList.map((item) => (
            <div
              key={`${item.type}-list-${item.title}`}
              className={cn(
                "px-xs py-xxxs flex-col flex border-l-8",
                scheduleTypeColorStyles[item.type].border,
                !filter.find((filterItem) => filterItem.type === item.type) &&
                  "hidden"
              )}
            >
              {/* <span className="text-sm">{item.title}</span> */}
              <span className="text-sm">abc</span>
              <div className="flex gap-xxxs">
                {item.date.map((item, idx) => (
                  <span key={idx} className="text-xs opacity-60">
                    {idx !== 0 && ","} {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* right - calendar */}
      <div className="bg-white border flex-1 h-full pc:min-h-full max-h-full p-[5px]">
        <div className="text-xs size-full flex flex-col ">
          {/* MTWTFSS */}
          <div className="grid grid-cols-7 mt-xs">
            {weeks.map((week, idx) => (
              <div key={week} className="flex justify-center">
                <span
                  className={cn(idx === weeks.length - 1 && "text-red-300")}
                >
                  {week}
                </span>
              </div>
            ))}
          </div>
          {/* days */}
          <div className="grid grid-cols-7 mt-xs flex-1">
            {daysOfMonth.map((day, idx) => (
              <DayGrid
                filter={filter}
                scheduleList={scheduleList}
                key={`${format(day, "yyyy-MM-dd")}-${idx}`}
                day={day}
                currentDate={currentDate}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export const scheduleTypeColorStyles: {
  [key in ScheduleType]: { default: string; hover: string; border: string };
} = {
  concert: {
    default: "bg-blue-300",
    hover: "hover:bg-blue-400",
    border: "border-blue-300",
  },
  event: {
    default: "bg-yellow-200",
    hover: "hover:bg-yellow-400",
    border: "border-yellow-200",
  },
  anniversary: {
    default: "bg-red-300",
    hover: "hover:bg-red-400",
    border: "border-red-300",
  },
  release: {
    default: "bg-blue-300",
    hover: "bg-blue-400",
    border: "border-blue-300",
  },
  etc: {
    default: "bg-blue-300",
    hover: "bg-blue-400",
    border: "border-blue-300",
  },
};

interface DayGridProps {
  scheduleList: Schedule[];
  currentDate: Date;
  day: Date;
  filter: Filter[];
}

function DayGrid(props: DayGridProps) {
  const { scheduleList, currentDate, day, filter } = props;
  const formattedDay = format(day, "yyyy-MM-dd");
  const isSunday = format(day, "iii") === "Sun";
  const isDayOfCurrentDate = format(day, "LLL") === format(currentDate, "LLL");

  const scheduleListOfDay = scheduleList.filter((schedule) =>
    schedule.date.includes(formattedDay)
  );

  return (
    <div className={cn("border-b", !isSunday && "border-r")}>
      <div className="flex justify-center">
        <span
          className={cn(
            isSunday && "text-red-300",
            !isDayOfCurrentDate && "opacity-40"
          )}
        >
          {format(day, "dd")}
        </span>
      </div>
      <div className="flex flex-col items-center justify-center mt-xxxs">
        {scheduleListOfDay.map((schedule) => (
          <ScheduleItem
            key={schedule.title}
            schedule={schedule}
            filter={filter}
          />
        ))}
      </div>
    </div>
  );
}

function ScheduleItem({
  schedule,
  filter,
}: {
  schedule: Schedule;
  filter: Filter[];
}) {
  const { openSingleModal } = useModal();

  function onClickSchedule() {
    openSingleModal(<ScheduleViewModal schedule={schedule} />);
  }
  return (
    <button
      onClick={onClickSchedule}
      key={schedule.title}
      className={cn(
        "w-[80%] min-h-[5px] rounded-md",
        scheduleTypeColorStyles[schedule.type].default,
        scheduleTypeColorStyles[schedule.type].hover,
        !filter.find((item) => item.type === schedule.type) && "opacity-0"
      )}
      aria-label="view schedule"
    ></button>
  );
}
