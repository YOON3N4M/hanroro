import React from "react";
import ModalTemplate from "../ModalTemplate";
import { Schedule } from "@/data/schedule";
import { cn, translateScheduleType } from "@/utils";

import NewTabAnchor from "@/components/ui/NewTabAnchor";
import Image from "next/image";
import {
  IconCalendar,
  IconLink,
  IconLocation,
  IconTimer,
} from "@/components/svg";
import { scheduleTypeColorStyles } from "@/containers/calendar";

interface ScheduleViewModalProps {
  schedule: Schedule;
}

export default function ScheduleViewModal(props: ScheduleViewModalProps) {
  const { schedule } = props;
  const { type, title, date, duration, location, desc, link, images } =
    schedule;
  return (
    <ModalTemplate>
      <div className="min-w-[500px] mo:min-w-[80vw] mo:max-w-[80vw]  ">
        <div className="flex items-center text-sm gap-xxs">
          <span className={cn(scheduleTypeColorStyles[type].text)}>
            {translateScheduleType(type)}
          </span>
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
              placeholder="blur"
              blurDataURL={images[0].blurDataURL}
            />
          )}
        </div>
        <div className="mt-sm flex flex-col gap-xxs">
          <div className="flex pc:gap-sm mo:gap-xxs text-sm mo:flex-col">
            <div className="flex gap-xxs items-center">
              <IconCalendar />
              <div className="flex gap-xxxs">
                {date.map((d, idx) => (
                  <span key={`${title}-${d}=${idx}`}>
                    {idx !== 0 ? "- " : ""}
                    {d}
                  </span>
                ))}
              </div>
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
          {link && (
            <div className="flex gap-xxs items-center">
              <IconLink />
              <NewTabAnchor className="text-sm underline" href={link}>
                {handleLinkText(link)}
              </NewTabAnchor>
            </div>
          )}
        </div>
      </div>
    </ModalTemplate>
  );
}

function handleLinkText(link: string) {
  if (link.includes("instagram")) {
    return "instagram";
  }
  if (link.includes("youtube") || link.includes("youtu.be")) {
    return "youtube";
  }
  return link;
}
