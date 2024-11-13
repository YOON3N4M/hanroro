import { StaticImageData } from "next/image";
import {
  birthdayCafe1,
  birthdayCafe2,
  birthdayCafe3,
  wonderLivet,
} from "../../public/images/schdule";
import { theCompass } from "../../public/images/album";

export type ScheduleType =
  | "concert"
  | "anniversary"
  | "release"
  | "event"
  | "etc";

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
    type: "release",
    title: "나침반 발매",
    date: ["2024-10-29"],
    duration: "-",
    location: "-",
    link: "https://youtu.be/Xoqf8CZ12u8?si=t9w-Lm-NyTWfQv9a",
    images: [theCompass],
  },
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
    duration: "12:00~20:00 (19:30 last order)",
    location: "Waving (서울 광진구 광나루로 16길 5)",
    link: "https://www.instagram.com/p/DBkk1JzSG18/?igsh=MXBiYWpxazJoNjJ3OQ==",
    images: [birthdayCafe1, birthdayCafe2, birthdayCafe3],
  },
  {
    type: "anniversary",
    title: "한로로 데뷔 D+1000",
    date: ["2024-12-07"],
    duration: "-",
    location: "-",
  },
];
