"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface MirrorContainerProps {}

function MirrorContainer(props: MirrorContainerProps) {
  const {} = props;
  const { album, nextAlbum } = generateAlbumData("mirror");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div>
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/mirror.mp4" />
      <InformationSection album={album} />

      {/* <ImageSection src={"/images/album/mirror/1.webp"} /> */}
      {/* <ImageSection src={"/images/album/mirror/2.webp"} /> */}
      <ImageSection
        src={["/images/album/mirror/1.webp", "/images/album/mirror/2.webp"]}
      />

      {/* <ImageSection src={"/images/album/mirror/6.jpg"} /> */}
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}
export default MirrorContainer;
