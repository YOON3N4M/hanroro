"use client";

import { format, startOfMonth } from "date-fns";
import useCalendar from "./useCalendar";
import { IconRightLeft, IconRightRight } from "../svg";
import { cn } from "@/utils";

const weeks = ["M", "T", "W", "T", "F", "S", "S"];

export default function Calendar() {
  const { currentDate, daysOfMonth, nextMonth, prevMonth } = useCalendar();

  return (
    <div className="text-xs">
      {/* controller */}
      <div className="flex justify-between">
        <div className="flex min-w-[80px] justify-center">
          <span>
            {format(currentDate, "yyyy")}.{format(currentDate, "MM")}
          </span>
        </div>
        <div className="flex min-w-[80px] justify-center">
          <button onClick={prevMonth}>
            <IconRightLeft />
          </button>
          <button onClick={nextMonth}>
            <IconRightRight />
          </button>
        </div>
      </div>
      {/* MTWTFSS */}
      <div className="grid grid-cols-7 mt-xs">
        {weeks.map((week, idx) => (
          <div key={week} className="flex justify-center">
            <span className={cn(idx === weeks.length - 1 && "text-red-300")}>{week}</span>
          </div>
        ))}
      </div>
      {/* days */}
      <div className="grid grid-cols-7 mt-xs">
        {daysOfMonth.map((day, idx) => (
          <DayGrid key={`${format(day, "yyyy-MM-dd")}-${idx}`} day={day} />
        ))}
      </div>
    </div>
  );
}

function DayGrid({ day }: { day: Date }) {
  const isSunday = format(day, "iii") === "Sun";

  return (
    <div className="min-h-[50px]">
      <div className="flex justify-center">
        <span className={cn(isSunday && "text-red-300")}>{format(day, "dd")}</span>
      </div>
    </div>
  );
}
