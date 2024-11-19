"use client";

import { cn, scrollMove } from "@/utils";
import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import AlbumPanel from "./Panel/AlbumPanel";
import ProfilePanel from "./Panel/ProfilePanel";

export interface Tab {
  kor: string;
  eng: string;
}

const tabList: Tab[] = [
  { kor: "앨범", eng: "album" },
  // { kor: "프로필", eng: "profile" },
  { kor: "영상", eng: "media" },
];

export default function ProfileContainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [indexProgress, setIndexProgress] = useState<any>();

  function onClickNav(idx: number) {
    // setActiveIndex(idx);
    const target = tabList[idx].eng;
    scrollMove(target);
  }

  useEffect(() => {
    console.log(indexProgress);
  }, [indexProgress]);
  return (
    <div className="relative h-[400vh] flex flex-col overflow-visible">
      <h2 className="visually-hidden">프로필</h2>
      {/* nav */}
      <div className="fixed top-[30%] pc:left-[30px] tab:right-[15px] z-[30] flex flex-col animate-fadeIn">
        {tabList.map((tab, idx) => (
          <button
            key={`${tab.eng}-nav`}
            className={cn(
              "text-start text-white text-sm transition-all opacity-40",
              idx === activeIndex && "!opacity-100 !text-base"
            )}
            onClick={() => onClickNav(idx)}
          >
            {tab.kor}
          </button>
        ))}
      </div>
      {/* panel */}
      <div className="h-screen-nav fixed bg-black z-[25] w-full animate-fadeIn">
        <div className="size-full relative">
          {/* <ProfilePanel activePanelIndex={activeIndex} panelIndex={0} /> */}
          <AlbumPanel activePanelIndex={activeIndex} panelIndex={0} />
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
        <div className="h-screen-nav border relative bg-black"></div>
        {/* <div className="h-screen-nav w-full"></div> */}
      </div>
    </div>
  );
}
