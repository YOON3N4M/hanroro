"use client";

import Calendar from "@/components/calendar";

interface CalendarContainerProps {}

function CalendarContainer(props: CalendarContainerProps) {
  const {} = props;

  return (
    <div className="pt-md flex bg-default-black-bg inner gap-md pc:h-screen-nav px-md tab:flex-col">
      <Calendar />
    </div>
  );
}

export default CalendarContainer;
