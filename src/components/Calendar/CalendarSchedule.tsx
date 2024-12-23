import { ScheduleDoc } from "@/types";
import ScheduleViewModal from "../modal/form/ScheduleViewModal";
import useModal from "../modal/useModal";

import { Filter } from "./CalendarFilter";
import { cn } from "@/utils";
import { scheduleTypeColorStyles } from ".";

interface CalendarScheduleProps {
  schedule: ScheduleDoc;
  filterList: Filter[];
}

export default function CalendarSchedule(props: CalendarScheduleProps) {
  const { schedule, filterList } = props;

  const { openSingleModal } = useModal();
  const isDisplay = filterList.find((item) => item.type === schedule.type);

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
        !isDisplay && "hidden"
      )}
      aria-label="view schedule"
    ></button>
  );
}
