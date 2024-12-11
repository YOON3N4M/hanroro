"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface MayflyContainerProps {}

function MayflyContainer(props: MayflyContainerProps) {
  const {} = props;
  const { album, nextAlbum } = generateAlbumData("mayfly");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div className="bg-gradient-to-l via-transparent to-transparent from-[#edb16c4f]">
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/mayfly.mp4" />
      <InformationSection album={album} />

      <ImageSection src={"/images/album/mayfly/1.webp"} />
      {/* <ImageSection src={"/images/album/mayfly/2.webp"} /> */}
      <ImageSection
        imageClassName="h-[400px] tab:h-[400px]"
        src={["/images/album/mayfly/3.webp", "/images/album/mayfly/4.webp"]}
      />

      {/* <ImageSection src={"/images/album/mayfly/6.jpg"} /> */}
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default MayflyContainer;
