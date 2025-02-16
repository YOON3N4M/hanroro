"use client";

import NewTabAnchor from "@/components/ui/NewTabAnchor";
import { Music } from "@/data/music";
import YouTube from "react-youtube";

interface MusicItemProps {
  music: Music;
}

function MusicItem(props: MusicItemProps) {
  const { music } = props;
  const { name, artist, url } = music;

  return (
    <div className="flex gap-xs items-center relative">
      <NewTabAnchor href={url}>
        <div className="absolute size-full left-0 rounded-md top-0 bg-authentic-dark opacity-0 flex justify-center items-center"></div>
      </NewTabAnchor>
      <div>&#183;</div>
      <div className="mt-auto">
        <h2 className="text-ellipsis whitespace-nowrap max-w-[100%] overflow-hidden">
          {name}
        </h2>
        <span className="text-xs opacity-70">{artist}</span>
      </div>
    </div>
  );
}

export default MusicItem;
