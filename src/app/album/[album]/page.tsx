import AlbumContainer from "@/containers/Album";
import React from "react";

type AlbumPageParams = Promise<{ album: string }>;

interface AlbumPageProps {
  params: AlbumPageParams;
}

export default async function AlbumPage(props: AlbumPageProps) {
  const { params } = props;
  const { album: albumTitle } = await params;

  return <AlbumContainer albumTitle={albumTitle} />;
}
