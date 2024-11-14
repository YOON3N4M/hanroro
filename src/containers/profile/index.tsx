"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import ProfileSection from "./ProfileSection";
import { cn, scrollMove } from "@/utils";
import { MotionValue } from "motion";

export interface Tab {
  kor: string;
  eng: string;
}

const tabList: Tab[] = [
  { kor: "프로필", eng: "profile" },
  { kor: "앨범", eng: "album" },
  { kor: "영상", eng: "media" },
];

export default function ProfileContainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexProgress, setIndexProgress] = useState<any>();

  function onClickNav(idx: number) {
    setActiveIndex(idx);
    const target = tabList[idx].eng;
    scrollMove(target);
  }

  useEffect(() => {
    console.log(indexProgress);
  }, [indexProgress]);
  return (
    <div className="relative h-[400vh] flex flex-col overflow-visible">
      {/* nav */}
      <div className="fixed y-center left-[30px] z-[30] flex flex-col">
        {tabList.map((tab, idx) => (
          <button
            key={`${tab.eng}-nav`}
            className="text-start"
            onClick={() => onClickNav(idx)}
          >
            {tab.kor}
          </button>
        ))}
      </div>
      {/* viewer */}
      <div className="h-screen fixed bg-black z-[25] opacity-40 w-full">
        <div className="size-full relative">
          <div className="absolute center text-white">
            컨텐츠 패널{activeIndex}
          </div>
        </div>
      </div>
      {/* spacer (scroll-trigger) */}
      <div className="absolute top-0 left-0 w-full h-min">
        {tabList.map((tab, idx) => (
          <ProfileSection
            tab={tab}
            index={idx}
            key={`profile-section-${tab.eng}`}
            indexSetter={setActiveIndex}
          />
        ))}
        {/* <div className="h-screen-nav w-full"></div> */}
      </div>
    </div>
  );
}
