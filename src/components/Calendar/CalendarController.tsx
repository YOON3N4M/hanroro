import { format } from "date-fns";
import { IconTriangleLeft, IconTriangleRight } from "../svg";

interface CalendarControllerProps {
  currentDate: Date;
  nextMonth: () => void;
  prevMonth: () => void;
}

export default function CalendarController(props: CalendarControllerProps) {
  const { currentDate, nextMonth, prevMonth } = props;
  return (
    <div className="mt-md text-sm flex gap-xs">
      <span className=""> {format(currentDate, "yyyy")}</span>
      <span className="">{format(currentDate, "MM")}</span>
      <div className="ml-auto flex gap-sm">
        <button onClick={prevMonth} aria-label="calendar prev month">
          <IconTriangleLeft />
        </button>
        <button onClick={nextMonth} aria-label="calendar next month">
          <IconTriangleRight />
        </button>
      </div>
    </div>
  );
}
