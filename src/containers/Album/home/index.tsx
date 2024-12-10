"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface HomeContainerProps {}

function HomeContainer(props: HomeContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("home");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div>
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/home.mp4" />
      <InformationSection album={album} />

      <ImageSection
        src={["/images/album/home/1.webp", "/images/album/home/2.webp"]}
      />
      <ImageSection
        src={["/images/album/home/3.webp", "/images/album/home/4.webp"]}
      />
      <ImageSection
        src={"/images/album/home/5.webp"}
        // imageClassName="w-[80%]"
      />
      <ImageSection
        src={["/images/album/home/6.webp", "/images/album/home/7.jpg"]}
      />
      {/* <ImageSection
        src={["/images/album/home/5.webp", "/images/album/home/4.webp"]}
      /> */}

      {/* <ImageSection src={"/images/album/home/8.webp"} /> */}

      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default HomeContainer;
