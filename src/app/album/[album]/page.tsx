import AlbumContainer from "@/containers/album";
import React from "react";
import { Metadata } from "next";
import { LOCAL_ALBUM_PAGE_DATA } from "@/containers/album/_local";

type AlbumPageParams = Promise<{ album: string }>;

interface AlbumPageProps {
  params: AlbumPageParams;
}

export async function generateMetadata(
  props: AlbumPageProps
): Promise<Metadata> {
  const { params } = props;
  const { album: albumTitle } = await params;

  const albumData = LOCAL_ALBUM_PAGE_DATA.find(
    (data) => data.album.engTitle.toLowerCase() === albumTitle.toLowerCase()
  );

  if (!albumData) {
    return {
      title: "한로로 팬사이트 | 앨범",
    };
  }

  const { album } = albumData;

  return {
    title: `한로로 팬사이트 | ${album.title}`,
    description: album.desc || `${album.title} 앨범 정보`,
    openGraph: {
      title: `한로로 팬사이트 | ${album.title}`,
      description: album.desc || `${album.title} 앨범 정보`,
      type: "website",
    },
  };
}

export default async function AlbumPage(props: AlbumPageProps) {
  const { params } = props;
  const { album: albumTitle } = await params;

  return <AlbumContainer albumTitle={albumTitle} />;
}
