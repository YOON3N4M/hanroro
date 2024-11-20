"use client";

import { format, startOfMonth } from "date-fns";
import useCalendar from "./useCalendar";
import { IconCalendar, IconRightLeft, IconRightRight, IconTimer } from "../svg";
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
  { type: "release", kor: "발매" },
  //   { type: "etc", kor: "기타" },
];

export default function Calendar() {
  const { currentDate, daysOfMonth, nextMonth, prevMonth, today } =
    useCalendar();
  const [scheduleList, setSchduleList] = useState(SCHEDULE_LIST);
  const [filter, setFilter] = useState<Filter[]>(TYPE_FILTER);

  const { openSingleModal } = useModal();

  function onFilterClick(obj: Filter) {
    if (filter.find((item) => item.type === obj.type)) {
      setFilter((prev) => prev.filter((item) => item.type !== obj.type));
    } else {
      setFilter((prev) => [...prev, obj]);
    }
  }
  function onClickSchedule(schedule: Schedule) {
    openSingleModal(<ScheduleViewModal schedule={schedule} />);
  }
  return (
    <>
      {/* left */}

      {/* right - calendar */}
      <div className="bg-default-black-bg border flex-1 mo:h-screen p-[5px]">
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
    default: "bg-orange-300",
    hover: "bg-orange-400",
    border: "border-orange-300",
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
  const { today } = useCalendar();
  const formmatedToday = format(today, "yyyy-MM-dd");
  const { scheduleList, currentDate, day, filter } = props;
  const formattedDay = format(day, "yyyy-MM-dd");
  const isSunday = format(day, "iii") === "Sun";
  const isDayOfCurrentDate = format(day, "LLL") === format(currentDate, "LLL");
  const isToday = formmatedToday === formattedDay;

  const scheduleListOfDay = scheduleList.filter((schedule) =>
    schedule.date.includes(formattedDay)
  );

  return (
    <div
      className={cn(
        "border-b relative",
        !isSunday && "border-r",
        isToday && "bg-gray-50"
      )}
    >
      {isToday && (
        <span className="absolute center opacity-50 font-bold">오늘</span>
      )}
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
      <div className="flex flex-col items-center justify-start mt-xxxs tab:min-h-[80px] pt-xxs">
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
        "w-[80%] min-h-[5px] rounded-md animate-fadeIn",
        scheduleTypeColorStyles[schedule.type].default,
        scheduleTypeColorStyles[schedule.type].hover,
        !filter.find((item) => item.type === schedule.type) && "hidden"
      )}
      aria-label="view schedule"
    ></button>
  );
}
