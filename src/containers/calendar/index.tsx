"use client";

import Calendar from "@/components/calendar";

interface CalendarContainerProps {}

function CalendarContainer(props: CalendarContainerProps) {
  const {} = props;

  return (
    <div className="pt-md flex text-black bg-white gap-md h-screen px-md mo:flex-col">
      <Calendar />
    </div>
  );
}

export default CalendarContainer;
