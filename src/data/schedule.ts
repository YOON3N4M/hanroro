import { StaticImageData } from "next/image";
import { wonderLivet } from "../../public/images/schdule";

export type ScheduleType = "concert" | "anniversary" | "release" | "event" | "etc";

export interface Schedule {
  type: ScheduleType;
  title: string;
  //date - yyyy-MM-dd
  date: string[];
  duration: string;
  location: string;
  desc?: string;
  link?: string;
  images?: StaticImageData[];
}

export const SCHEDULE_LIST: Schedule[] = [
  {
    type: "concert",
    title: "WONDERLIVET 2024",
    date: ["2024-11-08"],
    duration: "14:50~15:30",
    location: "일산 킨텍스 원더스테이지",
    link: "https://wonderli.vet/",
    images: [wonderLivet],
  },
  {
    type: "event",
    title: "한로로 생일카페",
    date: ["2024-11-09", "2024-11-10"],
    duration: "00:00~00:00",
    location: "일산 킨텍스 원더스테이지",
    link: "https://wonderli.vet/",
    images: [wonderLivet],
  },
];
