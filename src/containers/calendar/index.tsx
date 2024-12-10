"use client";

import { ScheduleResult } from "@/app/calendar/page";
import Calendar from "@/components/calendar";
import useCalendar from "@/components/calendar/useCalendar";
import { BasicCarousel } from "@/components/carousel";
import { usePrevNextButtons } from "@/components/carousel/usePrevNextButton";
import ScheduleUploadModal from "@/components/modal/form/ScheduleUploadModal";
import ScheduleViewModal from "@/components/modal/form/ScheduleViewModal";
import useModal from "@/components/modal/useModal";
import { IconRightLeft, IconRightRight } from "@/components/svg";

import { useUserDoc } from "@/store/auth";
import { cn, getNumberDate, translateScheduleType } from "@/utils";
import { format } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { HTMLAttributes, ReactNode, useState } from "react";
import { ScheduleDoc, ScheduleType } from "@/types";
export interface Filter {
  type: ScheduleType;
  kor: string;
}
interface CalendarContainerProps {
  scheduleList: ScheduleDoc[];
}

export const TYPE_FILTER: Filter[] = [
  { type: "concert", kor: "공연" },
  { type: "event", kor: "티켓팅/이벤트" },
  { type: "anniversary", kor: "기념일" },
  { type: "release", kor: "발매" },
  //   { type: "etc", kor: "기타" },
];

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

function CalendarContainer(props: CalendarContainerProps) {
  const { scheduleList } = props;

  const userDoc = useUserDoc();
  const { openSingleModal } = useModal();

  const { currentDate, daysOfMonth, nextMonth, prevMonth, today } =
    useCalendar();
  // const [scheduleList, setScheduleList] = useState(SCHEDULE_LIST)
  const soonScheduleList = scheduleList.filter(
    (item) =>
      getNumberDate(item.startDate) >=
      getNumberDate(format(today, "yyyy-MM-dd"))
  );

  const [filter, setFilter] = useState<Filter[]>(TYPE_FILTER);

  function onFilterClick(obj: Filter) {
    if (filter.find((item) => item.type === obj.type)) {
      setFilter((prev) => prev.filter((item) => item.type !== obj.type));
    } else {
      setFilter((prev) => [...prev, obj]);
    }
  }

  function onAddScheduleClick() {
    openSingleModal(<ScheduleUploadModal />);
  }

  console.log(scheduleList);

  return (
    <div className="pt-md mt-[2rem] text-sm bg-default-black-bg inner pc:min-h-screen-nav">
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
      <div>
        <SoonScheduleCarousel soonScheduleList={soonScheduleList} />
      </div>

      {/* calendar */}
      <div className="mt-md text-sm flex gap-xs">
        <span className=""> {format(currentDate, "yyyy")}</span>
        <span className="">{format(currentDate, "MM")}</span>
        <div className="ml-auto flex gap-sm">
          <button onClick={prevMonth} aria-label="calendar prev month">
            <IconRightLeft />
          </button>
          <button onClick={nextMonth} aria-label="calendar next month">
            <IconRightRight />
          </button>
        </div>
      </div>
      {/* controller */}
      <div className="mt-sm flex">
        <div className="flex gap-md">
          <span className="opacity-70">필터</span>
          {TYPE_FILTER.map((type) => (
            <button
              onClick={() => onFilterClick(type)}
              key={type.type}
              className="flex items-center gap-xxs tab:text-xs"
            >
              <span
                className={cn(
                  "size-[12px] border-2",
                  scheduleTypeColorStyles[type.type].border,
                  filter.find((item) => item.type === type.type) &&
                    scheduleTypeColorStyles[type.type].default
                )}
              ></span>
              <span> {type.kor}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="min-h-[500px] pc:h-[500px] tab:h-[800px]">
        <Calendar
          today={today}
          currentDate={currentDate}
          daysOfMonth={daysOfMonth}
          scheduleList={scheduleList}
          filter={filter}
        />
      </div>
    </div>
  );
}

export default CalendarContainer;

function SoonScheduleCarousel({
  soonScheduleList,
}: {
  soonScheduleList: ScheduleDoc[];
}) {
  const { openSingleModal } = useModal();

  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });
  const { onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
  const tempList = [1, 2, 3].slice(0, 3 - soonScheduleList.length);

  function onClickSchedule(schedule: ScheduleDoc) {
    openSingleModal(<ScheduleViewModal schedule={schedule} />);
  }

  return (
    <div className="flex-col flex">
      <div className="flex justify-between">
        <h3 className="">다가오는 일정</h3>
        <div className="flex gap-sm">
          <button onClick={onPrevButtonClick} aria-label="calendar prev month">
            <IconRightLeft />
          </button>
          <button onClick={onNextButtonClick} aria-label="calendar next month">
            <IconRightRight />
          </button>
        </div>
      </div>
      <div className="mt-sm">
        <BasicCarousel emblaRef={emblaRef}>
          {soonScheduleList.map((schedule, idx) => (
            <Slide
              key={schedule.title}
              idx={idx}
              className="basis-[30%] flex flex-col p-sm tab:basis-[50%] shrink-0 bg-[#111111] border min-h-[150px] rounded-md ml-sm"
            >
              <span
                className={cn(
                  "text-xs p-xxxs rounded-[2px]",
                  scheduleTypeColorStyles[schedule.type].text
                )}
              >
                {translateScheduleType(schedule.type)}
              </span>
              <h4 className="mt-sm">{schedule.title}</h4>
              <div className="flex gap-xxxs opacity-70 text-xs">
                <span>{schedule.startDate}</span>
                {schedule.endDate && (
                  <>
                    <span>~</span>
                    <span>{schedule.endDate}</span>
                  </>
                )}
              </div>
              <div className="mt-auto flex">
                <button
                  onClick={() => onClickSchedule(schedule)}
                  className="ml-auto border py-xxs px-xs rounded-md"
                >
                  <span className="opacity-70 text-xs">자세히</span>
                </button>
              </div>
            </Slide>
          ))}
          {soonScheduleList.length < 3 &&
            tempList.map((num) => (
              <Slide
                key={num}
                idx={num + 1}
                className="relative basis-[30%] flex flex-col p-sm tab:basis-[50%] shrink-0 bg-[#111111] border min-h-[150px] rounded-md ml-sm"
              >
                <p className="opacity-70 absolute center">
                  예정된 일정이 없습니다.
                </p>
              </Slide>
            ))}
          {soonScheduleList.length >= 3 && (
            <Slide
              key={3}
              idx={3 + 1}
              className="relative basis-[30%] flex flex-col p-sm tab:basis-[50%] shrink-0 bg-[#111111] border min-h-[150px] rounded-md ml-sm"
            >
              <p className="opacity-70 absolute center">마지막 일정 입니다.</p>
            </Slide>
          )}
        </BasicCarousel>
      </div>
    </div>
  );
}

interface SlideProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  idx: number;
}

function Slide(props: SlideProps) {
  const { children, idx, className } = props;
  const isFirstIndex = idx === 0;
  return (
    <div className={cn(className, isFirstIndex && "!ml-0")}>{children}</div>
  );
}
