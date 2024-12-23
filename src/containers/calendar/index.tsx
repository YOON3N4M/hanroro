"use client";

import ScheduleUploadModal from "@/components/Modal/form/ScheduleUploadModal";
import useModal from "@/components/Modal/useModal";

import { Calendar } from "@/components/Calendar";
import { useUserDoc } from "@/store/auth";
import { ScheduleDoc } from "@/types";
import SoonScheduleCarousel from "./SoonScheduleCarousel";

interface CalendarContainerProps {
  scheduleList: ScheduleDoc[];
}

function CalendarContainer(props: CalendarContainerProps) {
  const { scheduleList } = props;

  const userDoc = useUserDoc();
  const { openSingleModal } = useModal();

  function onAddScheduleClick() {
    openSingleModal(<ScheduleUploadModal />);
  }

  return (
    <div className="y-inner text-sm bg-default-black-bg inner pc:min-h-screen">
      <h2 className="visually-hidden">일정</h2>
      {userDoc && userDoc.job === "admin" && (
        <div className="flex mb-md">
          <button
            onClick={onAddScheduleClick}
            className="ml-auto border py-xxs px-xs rounded-md text-xs"
          >
            일정 추가
          </button>
        </div>
      )}
      {/* carousel */}
      <SoonScheduleCarousel scheduleList={scheduleList} />
      {/* calendar */}
      <Calendar scheduleList={scheduleList} />
    </div>
  );
}

export default CalendarContainer;
