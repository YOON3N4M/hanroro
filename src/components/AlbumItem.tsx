"use client";

import { Album, Track } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { IconYoutube } from "./svg";

interface AlbumItemProps {
  album: Album;
}

function AlbumItem(props: AlbumItemProps) {
  const { album } = props;
  const { type, title, cover, releaseDate, trackList } = album;

  return (
    <div className="flex flex-col">
      <div className="flex gap-md">
        <div className="relative w-[70px]">
          <Image
            src={cover.src}
            width={cover.width}
            height={cover.height}
            className="w-full"
            alt={title}
          />
        </div>
        <div className="mt-auto">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div className="flex gap-xs">
            <span className="text-sm">{type}</span>
            <span className="text-sm">{releaseDate}</span>
          </div>
        </div>
      </div>
      <div className="mt-sm w-[90%] mx-auto border-t border-authentic-light">
        {trackList.map((track, idx) => (
          <TrackItem
            key={`${title}-${track.title}`}
            track={track}
            idx={idx + 1}
          />
        ))}
      </div>
    </div>
  );
}

export default AlbumItem;

function TrackItem({ track, idx }: { track: Track; idx: number }) {
  const { title, duration } = track;

  const [isHover, setIsHover] = useState(false);

  function onHover() {
    setIsHover((prev) => !prev);
  }

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onHover}
      className="flex gap-sm py-xxs px-xs items-center text-sm border-b border-authentic-light"
    >
      <span>{idx}</span>
      <h3>{title}</h3>
      <div className="ml-auto flex items-center">
        {!isHover ? (
          <span className="ml-auto">{duration}</span>
        ) : (
          <a
            href="https://www.instagram.com/hanr0r0?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconYoutube />
          </a>
        )}
      </div>
    </div>
  );
}
