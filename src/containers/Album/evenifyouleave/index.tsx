"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface EvenIfYouLeaveContainerProps {}

function EvenIfYouLeaveContainer(props: EvenIfYouLeaveContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("evenIfYouLeave");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div className="bg-gradient-to-l via-transparent to-transparent from-[#6ea7ca6b]">
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/evenifyouleave.mp4" />
      <InformationSection album={album} />

      <ImageSection
        src={[
          "/images/album/evenifyouleave/1.jpg",
          "/images/album/evenifyouleave/2.webp",
        ]}
      />
      <ImageSection
        src={"/images/album/evenifyouleave/3.webp"}
        imageClassName="w-[80%]"
      />
      <ImageSection
        src={[
          "/images/album/evenifyouleave/5.webp",
          "/images/album/evenifyouleave/4.webp",
        ]}
      />

      <ImageSection src={"/images/album/evenifyouleave/6.webp"} />
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default EvenIfYouLeaveContainer;
