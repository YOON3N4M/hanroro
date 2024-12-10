"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface SystemErrorContainerProps {}

function SystemErrorContainer(props: SystemErrorContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("systemError");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div>
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/systemerror.mp4" />
      <InformationSection album={album} />
      <ImageSection
        src={"/images/album/systemerror/1.webp"}
        imageClassName=""
      />
      <ImageSection
        src={[
          "/images/album/systemerror/3.webp",
          "/images/album/systemerror/4.webp",
        ]}
      />
      <ImageSection
        src={"/images/album/systemerror/2.webp"}
        imageClassName=""
      />

      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default SystemErrorContainer;
