"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface DonBeAfraidToFallContainerProps {}

function DonBeAfraidToFallContainer(props: DonBeAfraidToFallContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("dontBeAfraidToFall");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div className="bg-gradient-to-l via-transparent to-transparent from-[#e0d10060]">
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/dontbeafraidtofall.mp4" />
      <InformationSection album={album} />

      <ImageSection src={"/images/album/dontbeafraidtofall/1.webp"} />
      <ImageSection
        src={[
          "/images/album/dontbeafraidtofall/2.webp",
          "/images/album/dontbeafraidtofall/4.webp",
        ]}
      />
      <ImageSection
        src={"/images/album/dontbeafraidtofall/3.webp"}
        imageClassName="w-[80%]"
      />

      {/* <ImageSection src={"/images/album/dontbeafraidtofall/6.jpg"} /> */}
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default DonBeAfraidToFallContainer;
