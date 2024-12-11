"use client";

import { generateAlbumData } from "@/utils";
import CategorySection from "../CategorySection";
import ImageSection from "../ImageSection";
import InformationSection from "../InformationSection";
import IntroSection from "../IntroSection";
import NextAlbumSection from "../NextAlbumSection";
import VideoSection from "../VideoSection";

interface LetMeLoveMyYouthContainerProps {}

function LetMeLoveMyYouthContainer(props: LetMeLoveMyYouthContainerProps) {
  const {} = props;

  const { album, nextAlbum } = generateAlbumData("letMeLoveMyYouth");
  if (!album) return;

  const { title, releaseDate, type, desc, trackList, cover } = album;
  return (
    <div className="bg-gradient-to-l via-transparent to-transparent from-[#ffffff60]">
      <IntroSection title={title} releaseDate={releaseDate} />
      <CategorySection format={type} label="Authentic" release={releaseDate} />
      <VideoSection src="/video/letmelovemyyouth.mp4" />
      <InformationSection album={album} />

      <ImageSection src={"/images/album/letmelovemyyouth/1.webp"} />
      {/* <ImageSection
        imageClassName="w-[10%] h-auto"
        src={["/images/album/take-off.webp", "/images/album/letmelovemyyouth/1.webp"]}
      /> */}
      <ImageSection
        imageClassName=""
        src={[
          "/images/album/letmelovemyyouth/2.webp",
          "/images/album/letmelovemyyouth/3.jpg",
        ]}
      />
      <ImageSection
        src={"/images/album/letmelovemyyouth/4.jpeg"}
        imageClassName="w-[80%]"
      />
      <ImageSection src={"/images/album/letmelovemyyouth/5.webp"} />
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}

export default LetMeLoveMyYouthContainer;
