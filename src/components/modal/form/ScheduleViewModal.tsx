import React from "react";
import ModalTemplate from "../ModalTemplate";
import { Schedule } from "@/data/schedule";
import { cn } from "@/utils";
import { scheduleTypeColorStyles } from "@/components/calendar";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import Image from "next/image";
import { IconCalendar, IconLink, IconLocation, IconTimer } from "@/components/svg";

interface ScheduleViewModalProps {
  schedule: Schedule;
}

export default function ScheduleViewModal(props: ScheduleViewModalProps) {
  const { schedule } = props;
  const { type, title, date, duration, location, desc, link, images } = schedule;
  return (
    <ModalTemplate>
      <div className="min-w-[500px]">
        <div className="flex items-center text-sm gap-xxs">
          <span className={cn("size-[5px] rounded-full", scheduleTypeColorStyles[type].default)}></span>
          <span>{type}</span>
        </div>
        <div>
          <h2>{title}</h2>
        </div>
        <div className="flex justify-center mt-sm">
          {images && (
            <Image
              src={images[0].src}
              width={images[0].width}
              height={images[0].height}
              className="max-h-[500px] w-auto"
              alt={title}
            />
          )}
        </div>
        <div className="mt-sm flex flex-col gap-xxs">
          <div className="flex gap-sm text-sm">
            <div className="flex gap-xxs items-center">
              <IconCalendar />
              {date}
            </div>
            <span className="flex gap-xxs items-center">
              <IconTimer />
              {duration}
            </span>
          </div>
          <div className="text-sm flex gap-xxs items-center">
            <IconLocation />
            {location}
          </div>
          <div className="flex gap-xxs items-center">
            <IconLink />
            <NewTabAnchor className="text-sm underline" href={link}>
              {link}
            </NewTabAnchor>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
}
