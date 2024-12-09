"use client";

import { Album } from "@/types";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InfromationSection from "../InfromationSection";
import IntroSection from "../IntroSection";
import VideoSection from "../VideoSection";
import { generateAlbumData } from "@/utils";

interface TakeOffContainerProps {}

function TakeOffContainer(props: TakeOffContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("takeOff");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div
    // className={cn(
    //   "bg-gradient-to-l via-transparent to-transparent",
    //   gradientBgStyles["takeOff"]
    // )}
    >
      <IntroSection workTitle="이상비행" workYear="2022" />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection
        src="/video/takeoff.mp4"
        overlaySrc="/images/album/takeoff/0.jpg"
      />
      <InfromationSection album={album} />

      <ImageSection src={"/images/album/takeoff/2.jpg"} />
      {/* <ImageSection
        imageClassName="w-[10%] h-auto"
        src={["/images/album/take-off.webp", "/images/album/takeoff/1.webp"]}
      /> */}
      <ImageSection
        imageClassName="h-[720px] tab:h-[400px]"
        src={["/images/album/takeoff/3.jpg", "/images/album/takeoff/5.jpg"]}
      />
      <ImageSection
        src={"/images/album/takeoff/4.jpg"}
        imageClassName="w-[80%] h-[720px]"
      />
      <ImageSection src={"/images/album/takeoff/6.jpg"} />
    </div>
  );
}

export default TakeOffContainer;
