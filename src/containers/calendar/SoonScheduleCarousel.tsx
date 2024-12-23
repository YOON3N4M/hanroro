import { scheduleTypeColorStyles } from "@/components/Calendar";
import useCalendar from "@/components/Calendar/useCalendar";
import { Carousel } from "@/components/Carousel";
import { usePrevNextButtons } from "@/components/Carousel/usePrevNextButton";
import ScheduleViewModal from "@/components/Modal/form/ScheduleViewModal";
import useModal from "@/components/Modal/useModal";
import { IconTriangleLeft, IconTriangleRight } from "@/components/svg";
import { ScheduleDoc } from "@/types";
import { cn, getNumberDate, translateScheduleType } from "@/utils";
import { format } from "date-fns";
import useEmblaCarousel from "embla-carousel-react";
import { HTMLAttributes, ReactNode } from "react";

interface SoonScheduleCarouselProps {
  scheduleList: ScheduleDoc[];
}

export default function SoonScheduleCarousel(props: SoonScheduleCarouselProps) {
  const { scheduleList } = props;

  const { today } = useCalendar();

  const soonScheduleList = scheduleList.filter(
    (item) =>
      getNumberDate(item.startDate) >=
      getNumberDate(format(today, "yyyy-MM-dd"))
  );

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
            <IconTriangleLeft />
          </button>
          <button onClick={onNextButtonClick} aria-label="calendar next month">
            <IconTriangleRight />
          </button>
        </div>
      </div>
      <div className="mt-sm">
        <Carousel emblaRef={emblaRef}>
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
        </Carousel>
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
