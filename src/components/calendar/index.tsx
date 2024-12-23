"use client";

import { ScheduleDoc, ScheduleType } from "@/types";
import { cn } from "@/utils";
import { format } from "date-fns";
import CalendarFilter, { Filter, TYPE_FILTER } from "./CalendarFilter";
import useCalendar from "./useCalendar";

import { useState } from "react";
import CalendarCell from "./CalendarCell";
import CalendarController from "./CalendarController";

export const scheduleTypeColorStyles: {
  [key in ScheduleType]: {
    default: string;
    hover: string;
    border: string;
    text: string;
  };
} = {
  concert: {
    default: "bg-blue-300",
    hover: "hover:bg-blue-400",
    border: "border-blue-300",
    text: "text-blue-300",
  },
  event: {
    default: "bg-yellow-200",
    hover: "hover:bg-yellow-400",
    border: "border-yellow-200",
    text: "text-yellow-200",
  },
  anniversary: {
    default: "bg-red-300",
    hover: "hover:bg-red-400",
    border: "border-red-300",
    text: "text-red-300",
  },
  release: {
    default: "bg-orange-300",
    hover: "bg-orange-400",
    border: "border-orange-300",
    text: "text-orange-300",
  },
  etc: {
    default: "bg-blue-300",
    hover: "bg-blue-400",
    border: "border-blue-300",
    text: "text-blue-300",
  },
};
interface CalendarProps {
  scheduleList: ScheduleDoc[];
}

const WEEK_LIST = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function Calendar(props: CalendarProps) {
  const { scheduleList } = props;
  const [filterList, setFilterList] = useState<Filter[]>(TYPE_FILTER);
  const { today, currentDate, daysOfMonth, prevMonth, nextMonth } =
    useCalendar();
  return (
    <>
      <CalendarController
        currentDate={currentDate}
        nextMonth={nextMonth}
        prevMonth={prevMonth}
      />
      <CalendarFilter filterList={filterList} setFilterList={setFilterList} />
      {/*  calendar */}
      <div className="min-h-[500px] pc:h-[500px] tab:h-[800px]">
        <h3 className="visually-hidden">캘린더</h3>
        <div className="bg-default-black-bg h-full mo:h-screen p-[5px]">
          <div className="text-xs size-full flex flex-col ">
            {/* MTWTFSS */}
            <div className="grid grid-cols-7 mt-xs border-y py-xs">
              {WEEK_LIST.map((week, idx) => (
                <div key={week} className="flex justify-center">
                  <span
                    className={cn(
                      idx === WEEK_LIST.length - 1 && "text-red-300"
                    )}
                  >
                    {week}
                  </span>
                </div>
              ))}
            </div>
            {/* days */}
            <div className="grid grid-cols-7 mt-xs flex-1">
              {daysOfMonth.map((day, idx) => (
                <CalendarCell
                  today={today}
                  filterList={filterList}
                  scheduleList={scheduleList}
                  key={`${format(day, "yyyy-MM-dd")}-${idx}`}
                  day={day}
                  currentDate={currentDate}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
