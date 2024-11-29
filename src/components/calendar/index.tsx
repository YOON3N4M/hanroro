"use client";

import { Filter, scheduleTypeColorStyles } from "@/containers/calendar";
import { ScheduleDoc } from "@/types";
import { cn, parseFormattedDate } from "@/utils";
import { EachDayOfIntervalResult, eachDayOfInterval, format } from "date-fns";
import ScheduleViewModal from "../modal/form/ScheduleViewModal";
import useModal from "../modal/useModal";
import useCalendar from "./useCalendar";

interface CalendarProps {
  today: Date;
  currentDate: Date;
  daysOfMonth: EachDayOfIntervalResult<
    {
      start: Date;
      end: Date;
    },
    undefined
  >;
  scheduleList: ScheduleDoc[];
  filter: Filter[];
}

const weeks = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function Calendar(props: CalendarProps) {
  const { today, currentDate, daysOfMonth, scheduleList, filter } = props;

  return (
    <>
      {/*  calendar */}
      <div className="bg-default-black-bg h-full mo:h-screen p-[5px]">
        <div className="text-xs size-full flex flex-col ">
          {/* MTWTFSS */}
          <div className="grid grid-cols-7 mt-xs border-y py-xs">
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

interface DayGridProps {
  scheduleList: ScheduleDoc[];
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

  const scheduleListOfDay = scheduleList.filter((schedule) => {
    if (!schedule.endDate) {
      return schedule.startDate === formattedDay;
    } else {
      const dateList = eachDayOfInterval({
        start: parseFormattedDate(schedule.startDate, "yyyy-MM-dddd"),
        end: parseFormattedDate(schedule.endDate, "yyyy-MM-dddd"),
      });

      return dateList.find((d) => format(d, "yyyy-MM-dd") === formattedDay);
    }
  });

  return (
    <div
      className={cn(
        "border-b relative",
        !isSunday && "border-r",
        isToday && "bg-default-gray-bg"
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
      <div className="flex flex-col gap-xxs items-center justify-start mt-xxxs tab:min-h-[80px] pt-xxs">
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
  schedule: ScheduleDoc;
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
