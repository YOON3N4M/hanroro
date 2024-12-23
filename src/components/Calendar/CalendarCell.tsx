import { cn, parseFormattedDate } from "@/utils";
import { eachDayOfInterval, format } from "date-fns";
import CalendarSchedule from "./CalendarSchedule";
import { ScheduleDoc } from "@/types";
import { Filter } from "./CalendarFilter";

interface CalendarCellProps {
  today: Date;
  scheduleList: ScheduleDoc[];
  currentDate: Date;
  day: Date;
  filterList: Filter[];
}

function CalendarCell(props: CalendarCellProps) {
  const { today, scheduleList, currentDate, day, filterList } = props;

  const formmatedToday = format(today, "yyyy-MM-dd");
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
          <CalendarSchedule
            key={`${schedule.startDate}-${schedule.title}`}
            schedule={schedule}
            filterList={filterList}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarCell;
