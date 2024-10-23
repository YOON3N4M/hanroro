"use client";

import { Music } from "@/data/music";
import YouTube from "react-youtube";

interface MusicItemProps {
  music: Music;
}

function MusicItem(props: MusicItemProps) {
  const { music } = props;
  const { name, artist } = music;

  return (
    <div className="flex gap-xs items-center">
      <div className="rounded-md overflow-hidden size-[50px] bg-black">
        {/* <YouTube
          videoId="VpoOjoiYcWY?si=2i1ekpYOUSkyB5Lm"
          opts={{
            width: "50px",
            height: "50px",
            playerVars: {
              modestbranding: 1,
              controls: 0,
              showinfo: 0,
              fs: 0,
            },
          }}
        /> */}
      </div>
      <div>
        <h2>{name}</h2>
        <span className="text-xs">{artist}</span>
      </div>
    </div>
  );
}

export default MusicItem;
