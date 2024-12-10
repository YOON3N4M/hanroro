"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface TheLastStopOfPainContainerProps {}

function TheLastStopOfPainContainer(props: TheLastStopOfPainContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("theLastStopOfPain");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div>
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/thelaststopofpain.mp4" />
      <InformationSection album={album} />

      <ImageSection src={"/images/album/thelaststopofpain/1.jpg"} />

      <ImageSection
        src={[
          "/images/album/thelaststopofpain/2.webp",
          "/images/album/thelaststopofpain/3.webp",
        ]}
      />
      <ImageSection
        src={[
          "/images/album/thelaststopofpain/5.webp",
          "/images/album/thelaststopofpain/6.webp",
        ]}
      />

      {/* <ImageSection src={"/images/album/thelaststopofpain/6.jpg"} /> */}
      <ImageSection src={"/images/album/thelaststopofpain/4.webp"} />
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default TheLastStopOfPainContainer;
