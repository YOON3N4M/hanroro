"use client";

import { cn, generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface TakeOffContainerProps {}

function TakeOffContainer(props: TakeOffContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("takeOff");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div
      className={cn(
        "bg-gradient-to-l via-transparent to-transparent from-[#0909f289]"
      )}
    >
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection
        src="/video/takeoff.mp4"
        overlaySrc="/images/album/takeoff/0.jpg"
      />
      <InformationSection album={album} />

      <ImageSection src={"/images/album/takeoff/2.jpg"} />
      {/* <ImageSection
        imageClassName="w-[10%] h-auto"
        src={["/images/album/take-off.webp", "/images/album/takeoff/1.webp"]}
      /> */}
      <ImageSection
        imageClassName=""
        src={["/images/album/takeoff/3.jpg", "/images/album/takeoff/5.jpg"]}
      />
      <ImageSection
        src={"/images/album/takeoff/4.jpg"}
        imageClassName="w-[80%] ml-auto"
      />
      <ImageSection src={"/images/album/takeoff/6.jpg"} />
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default TakeOffContainer;
