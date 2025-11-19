import AlbumContainer from "@/containers/Album";
import React from "react";

interface AlbumPageProps {
  params: { album: string };
}

export default function AlbumPage(props: AlbumPageProps) {
  const { params } = props;
  const { album: albumTitle } = params;

  return <AlbumContainer albumTitle={albumTitle} />;
}
