"use client";

import React from "react";
import { LOCAL_ALBUM_PAGE_DATA } from "./_local";
import IntroSection from "./section/IntroSection";
import CategorySection from "./section/CategorySection";
import VideoSection from "./section/VideoSection";
import InformationSection from "./section/InformationSection";
import ImageSection from "./section/ImageSection";
import { generateAlbumData } from "@/utils";
import NextAlbumSection from "./section/NextAlbumSection";

interface AlbumContainerProps {
  albumTitle: string;
}

export default function AlbumContainer(props: AlbumContainerProps) {
  const { albumTitle } = props;

  const albumData = LOCAL_ALBUM_PAGE_DATA.find((data) => data.album.engTitle.toLowerCase() === albumTitle);

  console.log(albumData);

  if (!albumData) return;

  const { album, videoSection, imageSectionList } = albumData;

  const { nextAlbum } = generateAlbumData(album.engTitle);

  return (
    <div className="bg-gradient-to-l via-transparent to-transparent from-[#ffffff60]">
      <IntroSection title={album.title} releaseDate={album.releaseDate} />
      <CategorySection format={album.type} label="Authentic" release={album.releaseDate} />
      <VideoSection src={videoSection} />
      <InformationSection album={album} />
      {imageSectionList.map((imageSection, index) => (
        <ImageSection key={index} src={imageSection} />
      ))}
      <NextAlbumSection album={nextAlbum} />
    </div>
  );
}
