import { cn, translateScheduleType } from "@/utils";
import ModalTemplate from "../ModalTemplate";

import {
  IconCalendar,
  IconLink,
  IconLocation,
  IconTimer,
} from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";

import { ScheduleDoc } from "@/types";
import { useState } from "react";
import SkeletonImage from "@/components/ui/SkeletonImage";
import Image from "next/image";
import { scheduleTypeColorStyles } from "@/components/Calendar";

interface ScheduleViewModalProps {
  schedule: ScheduleDoc;
}

export default function ScheduleViewModal(props: ScheduleViewModalProps) {
  const { schedule } = props;
  const {
    type,
    title,
    location,
    desc,
    link,
    images,
    startDate,
    endDate,
    startTime,
    endTime,
  } = schedule;

  const [isImgLoad, setIsImageLoad] = useState(false);
  return (
    <ModalTemplate>
      <div className="min-w-[500px] mo:min-w-[80vw] mo:max-w-[80vw] min-h-[30vh] flex flex-col">
        <div className="flex items-center text-sm gap-xxs">
          <span className={cn(scheduleTypeColorStyles[type].text)}>
            {translateScheduleType(type)}
          </span>
        </div>
        <div>
          <h2>{title}</h2>
        </div>
        <div className="flex justify-center mt-sm relative">
          {images && (
            <>
              {!isImgLoad && (
                <SkeletonImage className="size-full absolute top-0 left-0 bg-default-gray-bg" />
              )}
              <Image
                width={3000}
                height={3000}
                src={images}
                alt={"이미지"}
                className={cn(
                  "pc:max-h-[70vh] object-cover pc:w-auto mo:size-full",
                  !isImgLoad && "opacity-0"
                )}
                onLoad={() => setIsImageLoad(true)}
              />
            </>
          )}
        </div>
        <div
          className={cn("flex flex-col gap-xxs", images ? "mt-sm" : "mt-auto")}
        >
          <div className="flex pc:gap-sm mo:gap-xxs text-sm mo:flex-col">
            <div className="flex gap-xxs items-center">
              <IconCalendar />
              <div className="flex gap-xxxs">
                <span>{startDate}</span>
                {endDate && (
                  <>
                    <span>~</span>
                    <span>{endDate}</span>
                  </>
                )}
              </div>
            </div>
            {startTime && (
              <span className="flex gap-xxs items-center">
                <IconTimer />
                {startTime}
                {endTime && (
                  <>
                    <span>~</span>
                    <span>{endTime}</span>
                  </>
                )}
              </span>
            )}
          </div>
          {location && (
            <div className="text-sm flex gap-xxs items-center">
              <IconLocation />
              {location}
            </div>
          )}
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
