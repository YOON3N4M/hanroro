"use client";

import { cn, scrollMove } from "@/utils";
import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import AlbumPanel from "./Panel/AlbumPanel";
import ProfilePanel from "./Panel/ProfilePanel";
import { SearchParams } from "@/types";

export interface Tab {
  kor: string;
  eng: string;
  vh?: number;
}

interface ProfileContainerProps {
  searchParams?: SearchParams;
}

const tabList: Tab[] = [
  { kor: "프로필", eng: "profile", vh: 2 },
  { kor: "앨범", eng: "album" },
];

export default function ProfileContainer(props: ProfileContainerProps) {
  const { searchParams } = props;

  const [activeIndex, setActiveIndex] = useState(0);

  function onClickNav(idx: number) {
    // setActiveIndex(idx);
    const target = tabList[idx].eng;
    scrollMove(target);
  }

  useEffect(() => {
    if (!searchParams) return;
    if (searchParams.album) {
      scrollMove("album");
    }
  }, []);

  return (
    <div className="relative h-[400vh] flex flex-col overflow-visible">
      <h2 className="visually-hidden">프로필</h2>
      {/* nav */}
      <div className="fixed top-[30%] tab:flex-row tab:gap-sm tab:top-[50px] left-[30px] z-[30] flex flex-col animate-fadeIn">
        {tabList.map((tab, idx) => (
          <button
            key={`${tab.eng}-nav`}
            className={cn(
              "text-start text-white text-sm transition-opacity opacity-40",
              idx === activeIndex && "!opacity-100 !text-base"
            )}
            onClick={() => onClickNav(idx)}
          >
            {tab.kor}
          </button>
        ))}
      </div>
      {/* panel */}
      <div className="h-screen-nav fixed bg-default-black-bg z-[25] w-full animate-fadeIn">
        <div className="size-full relative">
          <ProfilePanel activePanelIndex={activeIndex} panelIndex={0} />
          <AlbumPanel
            activePanelIndex={activeIndex}
            panelIndex={1}
            searchParams={searchParams}
          />
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
        <div className="h-screen-nav border relative bg-default-black-bg"></div>
        {/* <div className="h-screen-nav w-full"></div> */}
      </div>
    </div>
  );
}
