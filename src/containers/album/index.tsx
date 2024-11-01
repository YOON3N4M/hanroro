import AlbumItem from "@/components/AlbumItem";
import { ALBUM_LIST } from "@/data/album";
import React from "react";

export default function AlbumContainer() {
  return (
    <div className="mt-sm">
      {ALBUM_LIST.map((album) => (
        <AlbumItem key={`${album.title}-${album.type}`} album={album} />
      ))}
    </div>
  );
}
