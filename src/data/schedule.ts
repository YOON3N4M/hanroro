import { StaticImageData } from "next/image";
import {
  birthdayCafe1,
  birthdayCafe2,
  birthdayCafe3,
  wonderLivet,
  thirdSolo,
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
    type: "concert",
    title: "2024 홍익 대동제",
    date: ["2024-09-27"],
    duration: "20:00~20:40",
    location: "홍익대학교 대운동장",
    link: "-",
  },
  {
    type: "concert",
    title: "2024 KAMF",
    date: ["2024-09-28"],
    duration: "20:30~21:00",
    location: "KAIST 본원 잔디광장",
    link: "-",
  },
  {
    type: "concert",
    title: "2024 SEBS 방송제 초대가수",
    date: ["2024-10-02"],
    duration: "-",
    location: "성신여대 운정그린캠퍼스 대강당",
    link: "-",
  },
  {
    type: "concert",
    title: "현대카드 curated 95 한로로 x 윤마치 x QWER",
    date: ["2024-10-09"],
    duration: "19:00~21:00",
    location: "현대카드 언더스테이지",
    link: "-",
  },
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
    link: "https://www.instagram.com/p/DBkk1JzSG18/",
    images: [birthdayCafe1, birthdayCafe2, birthdayCafe3],
  },
  {
    type: "release",
    title: "이상비행, 집 EP CD 재발매",
    date: ["2024-11-22"],
    duration: "10:00",
    location: "-",
    link: "https://www.instagram.com/p/DCn2Gh5ySnV/?utm_source=ig_web_copy_link",
  },
  {
    type: "anniversary",
    title: "한로로 데뷔 D+1000",
    date: ["2024-12-07"],
    duration: "-",
    location: "-",
  },
  {
    type: "event",
    title: "3차 단독 콘서트 '발아' 티켓팅 오픈",
    date: ["2024-11-28"],
    duration: "18:00",
    location: "-",
    images: [thirdSolo],
    link: "https://www.instagram.com/p/DCYnEtkS4Vj/?utm_source=ig_web_copy_link",
  },
  {
    type: "anniversary",
    title: "한로로 데뷔 D+1000",
    date: ["2024-12-07"],
    duration: "-",
    location: "-",
  },
  {
    type: "concert",
    title: "3차 단독 콘서트 '발아'",
    date: ["2025-01-11", "2025-01-12"],
    duration: "-",
    location: "YES24 LIVE HALL",
    images: [thirdSolo],
    link: "https://www.instagram.com/p/DCYnEtkS4Vj/?utm_source=ig_web_copy_link",
  },
];
