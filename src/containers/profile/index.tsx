"use client";

import { IconInstagram, IconYoutube } from "@/components/svg";
import NewTabAnchor from "@/components/ui/NewTabAnchor";
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/utils";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const tabList = [
  { kr: "프로필", eng: "profile" },
  { kr: "앨범", eng: "album" },
  { kr: "영상", eng: "media" },
];

function slideTab(
  timeline: gsap.core.Timeline,
  target: string,
  direction: 1 | -1
) {
  return timeline.to(target, {
    y: direction > 0 ? "100%" : "-100%",
    opacity: 0.5,
  });
}

export default function ProfileContainer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tl, setTl] = useState<gsap.core.Timeline>();

  function onTabClick(idx: number) {
    if (!tl) return;
    tl.progress(0.25 * idx);
    setActiveIndex(idx);
  }

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "+=5000",
        scrub: 1,
        pin: true,
      },
    });
    setTl(timeline);
    slideTab(timeline, "#test", -1);
    slideTab(timeline, "#test2", -1);
    slideTab(timeline, "#test3", -1);
    slideTab(timeline, "#test4", -1);
    // timeline.to("#test", { y: "-100%", opacity: 0.5 }).call(() => {
    //   setActiveIndex(1);
    // });
  }, []);
  return (
    <div
      id="scroll-section"
      className="w-ful relative h-screen bg-black text-white overflow-hidden translate-y-[-50px]"
    >
      <div className="absolute y-center text-white z-50 left-[30px] flex flex-col">
        {tabList.map((tab, idx) => (
          <button
            onClick={() => onTabClick(idx)}
            className={cn("text-left", idx === activeIndex ? "" : "opacity-55")}
            key={tab.eng}
          >
            {tab.kr}
          </button>
        ))}
      </div>
      <div
        id="test"
        className="absolute top-0 left-0 size-full bg-black border z-[30]"
      >
        <div className="relative size-full">
          <span className="absolute center text-[50px]">1</span>
        </div>
      </div>
      <div
        id="test2"
        className="absolute top-0 left-0 size-full bg-black border z-[29] "
      >
        <div className="relative size-full">
          <span className="absolute center text-[50px]">2</span>
        </div>
      </div>
      <div
        id="test3"
        className="absolute top-0 left-0 size-full bg-black border z-[28]"
      >
        <div className="relative size-full">
          <span className="absolute center text-[50px]">3</span>
        </div>
      </div>
      <div
        id="test4"
        className="absolute top-0 left-0 size-full bg-black border z-[27]"
      >
        <div className="relative size-full">
          <span className="absolute center text-[50px]">4</span>
        </div>
      </div>
      {/* <div className="relative w-full">
        <div className="w-full">
          <Image
            className="max-w-full"
            width={1000}
            height={1000}
            src="/images/profile/profile.jpg"
            alt="profile"
          />
        </div>
        <div className="absolute w-full h-full bg-black z-[-10] -top-sm"> </div>
      </div>
      <div className="mt-md text-authentic-brown text-sm">
        <div className="flex gap-md w-[80%] ml-auto bg-white translate-y-[-50%] p-md shadow-md mo:flex-col">
          <div className="flex-1 flex flex-col">
            <div className="flex justify-between">
              <h1 className="font-semibold text-lg">한로로</h1>
              <div className="flex items-center gap-xs">
                <NewTabAnchor href="https://www.instagram.com/hanr0r0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==">
                  <IconInstagram className="size-[18px]" />
                </NewTabAnchor>
                <NewTabAnchor href="https://youtube.com/@hanroro6055?si=PU5sFgGjwXMjXkGa">
                  <IconYoutube className="size-[18px]" />
                </NewTabAnchor>
              </div>
            </div>
            <div className="flex justify-between pc:mt-auto mo:mt-sm">
              <span>birth</span>
              <span>2000.11.11</span>
            </div>
            <div className="flex justify-between">
              <span>debut</span>
              <span>2022.03.14</span>
            </div>
            <div className="flex justify-between">
              <span>label</span>
              <span>Authentic</span>
            </div>
          </div>
          <div className="flex-1">
            <p className="">
              다가올 미래를 두려워하는 청춘에게 손을 건네는 것으로 그의 작품은
              시작됩니다. 누구보다 자신의 두려움이 크지만, 못지않은 용기로
              한로로는 분연히 시대의 아픔을 관통하고 우리와 유대합니다.
            </p>
          </div>
        </div>
      </div> */}
      {/* <div className="mt-md flex gap-md">
        <div className="flex-1 bg-authentic-brown text-4xl text-right">
          <p className="text-white">A</p>
          <p className="text-white">L</p>
          <p className="text-white">B</p>
          <p className="text-white">U</p>
          <p className="text-white">M</p>
        </div>
        <div className="flex-1">
          <Image width={1000} height={1000} src="/images/album/mayfly.webp" alt="mayfly" />
        </div>
      </div> */}
      {/* <div className="h-[100vh]"></div> */}
    </div>
  );
}
