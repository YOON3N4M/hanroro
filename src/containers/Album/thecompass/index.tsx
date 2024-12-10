"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface TheCompassContainerProps {}

function TheCompassContainer(props: TheCompassContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("theCompass");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div>
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/thecompass.mp4" />
      <InformationSection album={album} />

      <ImageSection
        src={[
          "/images/album/thecompass/1.jpg",
          "/images/album/thecompass/2.jpg",
        ]}
      />
      <ImageSection
        src={"/images/album/thecompass/3.jpg"}
        imageClassName="w-[80%]"
      />
      <ImageSection
        src={[
          "/images/album/thecompass/4.jpg",
          "/images/album/thecompass/5.jpg",
        ]}
      />
      <ImageSection
        src={"/images/album/thecompass/7.jpg"}
        imageClassName="w-[80%]"
      />
      <ImageSection
        src={[
          "/images/album/thecompass/6.jpg",
          "/images/album/thecompass/8.jpg",
        ]}
      />
      <ImageSection
        src={"/images/album/thecompass/9.jpg"}
        imageClassName="w-[80%]"
      />
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default TheCompassContainer;
